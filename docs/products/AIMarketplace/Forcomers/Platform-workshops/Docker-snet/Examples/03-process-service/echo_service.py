#!/usr/bin/env python3
import sys
import json

def echo():
    request = json.load(sys.stdin)
    request['message'] = 'echo: ' + request['message']
    json.dump(request, sys.stdout)

def main():
    if sys.argv[1] == 'echo':
        echo()
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()
