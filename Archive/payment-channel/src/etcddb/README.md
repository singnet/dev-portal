# etcd throughput

Number of clients: 10

Number of iterations: 500

Requests per seconds:

| op\nodes |   1 |   2|   3|   4|   5|   6|    7|    8|   9|  11|
|------    |-----|----|----|----|----|----|-----|-----|----|----|
| put      |7663 |1563|1455|1084| 986| 786|  677|  594| 466| 374|
| cas      |5918 |1640|1820|1321|1200|1156|  858|  721| 652| 529|


Put:

| Request  | Calls |
|----------|-------|
| writes   | 5000  |
| total    | 5000  |

Compare And Swap:

| Request  | Calls |
|----------|-------|
| reads    |  5000 |
| cas      |  5000 |
| total    | 10000 |
