package etcddb

import (
	"context"
	"time"

	"go.etcd.io/etcd/clientv3"
)

// EtcdClient struct has some useful methods to wolrk with etcd client
type EtcdClient struct {
	timeout time.Duration
	etcdv3  *clientv3.Client
}

// NewEtcdClient create new etcd storage client
func NewEtcdClient(connectionTimeout time.Duration, callTimeout time.Duration, endpoints []string) (*EtcdClient, error) {
	etcdv3, err := clientv3.New(clientv3.Config{
		Endpoints:   endpoints,
		DialTimeout: connectionTimeout,
	})

	if err != nil {
		return nil, err
	}

	return &EtcdClient{timeout: callTimeout, etcdv3: etcdv3}, nil
}

// Get gets value from etcd by key
func (client *EtcdClient) Get(key []byte) ([]byte, error) {

	ctx, cancel := context.WithTimeout(context.Background(), client.timeout)
	response, err := client.etcdv3.Get(ctx, byteArraytoString(key))
	defer cancel()

	if err != nil {
		return nil, err
	}

	for _, kv := range response.Kvs {
		return kv.Value, nil
	}
	return nil, nil
}

// Put puts key and value to etcd
func (client *EtcdClient) Put(key []byte, value []byte) error {

	etcdv3 := client.etcdv3
	ctx, cancel := context.WithTimeout(context.Background(), client.timeout)
	_, err := etcdv3.Put(ctx, byteArraytoString(key), byteArraytoString(value))
	defer cancel()

	return err
}

// CompareAndSet uses CAS operation to set a value
func (client *EtcdClient) CompareAndSet(key []byte, expect []byte, update []byte) (bool, error) {

	etcdv3 := client.etcdv3
	ctx, cancel := context.WithTimeout(context.Background(), client.timeout)
	defer cancel()

	response, err := etcdv3.KV.Txn(ctx).If(
		clientv3.Compare(clientv3.Value(byteArraytoString(key)), "=", byteArraytoString(expect)),
	).Then(
		clientv3.OpPut(byteArraytoString(key), byteArraytoString(update)),
	).Commit()

	if err != nil {
		return false, err
	}

	return response.Succeeded, nil
}

// Close closes etcd client
func (client *EtcdClient) Close() {
	client.etcdv3.Close()
}
