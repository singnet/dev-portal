Feature: etcd load test

  Scenario: write to and read from values

    Given etcd instances names are: "infra1", "infra2"
    Given etcd client enpoints are: "http://127.0.0.1:2479", "http://127.0.0.1:2579"
    Given etcd peer   enpoints are: "http://127.0.0.1:2480", "http://127.0.0.1:2580"

    # Given etcd cluster consists of 9 nodes

    Given ectd cluster is run
    Given there are 10 clients
    Given number of iterations is 500
    Then Put/Get requests should succeed
    Then Load Put requests should succeed
    Then CompareAndSet requests should succeed
    Then Etcd cluster is stopped
