package etcddb

import (
	"bytes"
	"errors"
	"fmt"
	"sync"
	"time"
)

var requests []*TestRequest
var requestsNum int
var iterations int
var timeout = 10 * time.Second
var connectionTimeout = 1 * time.Minute

type loadSyncStruct struct {
	mx         sync.Mutex
	wg         sync.WaitGroup
	exceptions []error
}

func (s *loadSyncStruct) addError(err error) {
	s.mx.Lock()
	defer s.mx.Unlock()
	s.exceptions = append(s.exceptions, err)
}

type loadFunc func(s *loadSyncStruct, request *TestRequest, storageClient *EtcdTestClient)

type TestRequest struct {
	channelID  uint32
	nonce      uint32
	prevAmount uint32
	curAmount  uint32
	maxAmount  uint32
	signature  uint32
}

func (request *TestRequest) GetKey() []byte {
	return intToByte32(request.channelID)
}

func (request *TestRequest) GetValue() []byte {
	return intToByte32(request.curAmount)
}

func (request *TestRequest) GetPrevValue() []byte {
	return intToByte32(request.prevAmount)
}

func (request *TestRequest) IncAmount() {
	request.prevAmount = request.curAmount
	request.curAmount = request.curAmount + 1
}

func (request *TestRequest) ToString() string {
	return fmt.Sprint("[",
		"channel id: ", request.channelID, ", ",
		"prev amount: ", request.prevAmount, ", ",
		"curr amount: ", request.curAmount, ", ",
		"]",
	)
}

type EtcdTestClient struct {
	*EtcdClient
	counter *requestCounter
}

func NewEtcdTestClient(endpoints []string) (*EtcdTestClient, error) {
	etcdClient, err := NewEtcdClient(connectionTimeout, timeout, endpoints)

	if err != nil {
		return nil, err
	}

	return &EtcdTestClient{
		EtcdClient: etcdClient,
		counter:    &requestCounter{},
	}, err
}

func (client *EtcdTestClient) Get(key []byte) ([]byte, error) {
	client.counter.IncReads()
	return client.EtcdClient.Get(key)
}

func (client *EtcdTestClient) Put(key []byte, value []byte) error {
	client.counter.IncWrites()
	return client.EtcdClient.Put(key, value)
}

func (client *EtcdTestClient) CompareAndSet(key []byte, expect []byte, update []byte) (bool, error) {
	client.counter.IncCAS()
	return client.EtcdClient.CompareAndSet(key, expect, update)
}

func createTestRequests(requestsNum uint32) *TestRequest {

	prevAmount := uint32(1)

	return &TestRequest{
		channelID:  requestsNum,
		nonce:      requestsNum * 2,
		prevAmount: prevAmount,
		curAmount:  prevAmount + 1,
		maxAmount:  50,
		signature:  100,
	}
}

func thereAreClients(num int) error {

	requestsNum = num
	for i := 0; i < requestsNum; i++ {
		requests = append(requests, createTestRequests(uint32(i)))
	}

	return nil
}

func numberOfIterationsIs(iter int) error {
	iterations = iter
	return nil
}

func putGetRequestsShouldSucceed() error {

	storage, err := NewEtcdTestClient(clientEndpoints)

	if err != nil {
		return err
	}

	defer storage.Close()

	start := time.Now()

	for _, request := range requests {

		key := request.GetKey()
		value := request.GetValue()

		err = storage.Put(key, value)

		if err != nil {
			return err
		}

		result, err := storage.Get(key)

		if err != nil {
			return err
		}

		if !bytes.Equal(value, result) {
			return errors.New("Values are not equal")
		}

		request.IncAmount()
	}

	storage.counter.Count("Put/Get requests", start)

	return nil
}

func loadPutRequestsShouldSucceed() error {

	return loadTest("Load Put/Get requests",
		func(
			s *loadSyncStruct, request *TestRequest,
			storage *EtcdTestClient) {
		},
		func(
			s *loadSyncStruct, request *TestRequest,
			storage *EtcdTestClient) {
			defer s.wg.Done()
			for i := 0; i < iterations; i++ {
				key := request.GetKey()
				value := request.GetValue()
				err := storage.Put(key, value)

				if err != nil {
					s.addError(err)
					break
				}
			}
		})
}

func compareAndSetRequestsShouldSucceed() error {

	return loadTest("Load CAS requests",
		func(
			s *loadSyncStruct, request *TestRequest,
			storage *EtcdTestClient) {
			key := request.GetKey()
			initialAmount := intToByte32(request.prevAmount)

			err := storage.Put(key, initialAmount)
			if err != nil {
				s.addError(err)
			}
		},
		func(
			s *loadSyncStruct, request *TestRequest,
			storage *EtcdTestClient) {
			defer s.wg.Done()

			for i := 0; i < iterations; i++ {

				key := request.GetKey()
				value := request.GetValue()

				prevValue, err := storage.Get(key)

				if err != nil {
					s.addError(err)
					break
				}

				success, err := storage.CompareAndSet(key, prevValue, value)

				if err == nil && !success {
					err = fmt.Errorf("etcd CAS fails expect: %v, update: %v", prevValue, value)
				}

				if err != nil {
					s.addError(err)
					break
				}

				request.IncAmount()
			}
		})
}

func loadTest(title string, init loadFunc, load loadFunc) error {

	s := &loadSyncStruct{}
	var storages []*EtcdTestClient

	for _, request := range requests {
		storage, err := NewEtcdTestClient(clientEndpoints)
		if err != nil {
			return err
		}
		defer storage.Close()
		storages = append(storages, storage)

		// call init function
		init(s, request, storage)
		storage.counter.Reset()
	}

	err := checkExceptions(s.exceptions)

	if err != nil {
		return err
	}

	s.wg.Add(len(requests))
	start := time.Now()

	for index, request := range requests {
		go load(s, request, storages[index])
	}

	s.wg.Wait()

	tottalCounter := requestCounter{}
	for _, storage := range storages {
		tottalCounter.Add(storage.counter)
	}

	tottalCounter.Count(title, start)

	return checkExceptions(s.exceptions)
}

func checkExceptions(exceptions []error) error {

	if len(exceptions) > 0 {
		for _, err := range exceptions {
			fmt.Println("Error: ", err)
		}
		return errors.New("Errors during load requests")
	}
	return nil
}
