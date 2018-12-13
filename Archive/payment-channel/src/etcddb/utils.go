package etcddb

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

const (
	clrColorBlue = "\x1b[34;1m"
	clrColorCyan = "\x1b[36;1m"
	clrColorEnd  = "\x1b[0m"
)

func byteArraytoString(bytes []byte) string {
	return string(bytes)
}

func stringToByteArray(str string) []byte {
	return []byte(str)
}

func intToByte32(value uint32) []byte {
	return []byte{
		byte(value & 0x000000FF),
		byte(value & 0x0000FF00),
		byte(value & 0x00FF0000),
		byte(value & 0xFF000000),
		0x00,
		0x00,
		0x00,
		0x00,
	}
}

func byteArrayToInt(array []byte) int {

	var value int
	base := 1

	for i := 0; i < len(array); i++ {
		value += int(array[i]) * base
		base <<= 8
	}

	return value
}

type requestCounter struct {
	read  int
	write int
	cas   int
	total int
}

func (counter *requestCounter) IncReads() {
	counter.read++
	counter.total++
}

func (counter *requestCounter) IncWrites() {
	counter.write++
	counter.total++
}

func (counter *requestCounter) IncCAS() {
	counter.cas++
	counter.total++
}

func (counter *requestCounter) Add(otherCounter *requestCounter) {
	counter.read += otherCounter.read
	counter.write += otherCounter.write
	counter.cas += otherCounter.cas
	counter.total += otherCounter.total
}

func (counter *requestCounter) Reset() {
	counter.read = 0
	counter.write = 0
	counter.cas = 0
	counter.total = 0
}

func (counter *requestCounter) Count(title string, start time.Time) {
	fmt.Println(title)
	elapsed := time.Now().Sub(start).Seconds()
	requestsPerTime := float64(counter.total) / float64(elapsed)

	printCount(clrColorBlue, "read  : ", counter.read)
	printCount(clrColorBlue, "write : ", counter.write)
	printCount(clrColorBlue, "cas   : ", counter.cas)
	printCount(clrColorBlue, "total : ", counter.total)

	fmt.Println(
		clrColorCyan,
		"elapsed time in seconds: ", elapsed, "\n",
		"requests per seconds: ", strconv.FormatFloat(requestsPerTime, 'f', 2, 64), "\n",
		clrColorEnd,
	)
}

func printCount(color string, name string, count int) {
	if count > 0 {
		fmt.Println(color, name, count, clrColorEnd)
	}
}

func split(strs string) []string {

	arr := []string{}
	for _, str := range strings.Split(strs, ",") {
		str = strings.Replace(str, "\"", "", -1)
		str = strings.TrimSpace(str)
		arr = append(arr, str)
	}

	return arr
}
