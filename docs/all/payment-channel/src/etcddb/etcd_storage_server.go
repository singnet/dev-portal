package etcddb

import (
	"errors"
	"net/url"
	"time"

	"go.etcd.io/etcd/embed"
)

// StartEtcdServer starts ectd server
// The method blocks until the server is started
// or failed by timeout
func StartEtcdServer(
	name string,
	clientEndpoint string,
	peerEndpoint string,
	initialCluster string,
	token string,
) (*embed.Etcd, error) {

	clientURL, err := url.Parse(clientEndpoint)

	if err != nil {
		return nil, err
	}

	peerURL, err := url.Parse(peerEndpoint)

	if err != nil {
		return nil, err
	}

	return StartEtcdServerWithURLS(name, clientURL, peerURL, initialCluster, token)
}

// StartEtcdServerWithURLS starts ectd server
// The method blocks until the server is started
// or failed by timeout
func StartEtcdServerWithURLS(
	name string,
	clientURL *url.URL,
	peerURL *url.URL,
	initialCluster string,
	token string,
) (*embed.Etcd, error) {

	cfg := embed.NewConfig()
	cfg.Name = name
	cfg.Dir = name + ".etcd"

	// --listen-client-urls
	cfg.LCUrls = []url.URL{*clientURL}

	// --advertise-client-urls
	cfg.ACUrls = []url.URL{*clientURL}

	// --listen-peer-urls
	cfg.LPUrls = []url.URL{*peerURL}

	// --initial-advertise-peer-urls
	cfg.APUrls = []url.URL{*peerURL}

	// --initial-cluster
	cfg.InitialCluster = initialCluster

	//  --initial-cluster-state
	cfg.ClusterState = embed.ClusterStateFlagNew

	etcd, err := embed.StartEtcd(cfg)

	if err != nil {
		return nil, err
	}

	select {
	case <-etcd.Server.ReadyNotify():
	case <-time.After(60 * time.Second):
		etcd.Server.Stop()
		return nil, errors.New("etcd server took too long to start: " + name)
	}

	return etcd, nil
}
