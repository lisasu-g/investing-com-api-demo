### China mainland connection sierrachart denali data feed delay serious

Such severe delays only occur when there are huge market fluctuations
The environment I use the software in is wine 6.3 running under gentoo linux [https://github.com/Kron4ek/wine-portable-executable]
Becuase the network environment is in mainland China. So the vpn solution [wireguard + tinyfecVPN] is used.
Specifically, all the IPs resolved from the two domains are put into a specific ipset and then all the IP traffic inside the ipset is directed to the vpn tunnel


已经打开了denali的数据压缩功能 在eurex和hkfe上面从来没有遇到过延迟严重的问题
我从日志中看到 在打开压缩功能之后 程序会从ds13.sierracharts.com下载数据

我不使用VPN的情况:
```
PING ds13.sierracharts.com (64.38.174.178) 56(84) bytes of data.
............................................................................................
--- ds13.sierracharts.com ping statistics ---
1000 packets transmitted, 908 received, 9% packet loss, time 18497ms
rtt min/avg/max/mdev = 271.011/271.586/272.144/0.578 ms, pipe 17, ipg/ewma 18.516/271.590 ms
使用VPN的情况
PING ds13.sierracharts.com (64.38.174.178) 56(84) bytes of data.

--- ds13.sierracharts.com ping statistics ---
1000 packets transmitted, 1000 received, 0% packet loss, time 14471ms
rtt min/avg/max/mdev = 157.824/159.101/169.700/1.168 ms, pipe 14, ipg/ewma 14.485/159.026 ms
```

然后打开程序记录log到文件的功能
执行如下

```
#!/bin/bash

WAIT=5

while true
do
        sleep $WAIT

        echo ActualMessageDelay$(cat /mnt/nvme/sierrachart/Logs/Message\ Log* | grep "SC Data - All Services | Heartbeat from server" | tail -1 | awk -F 'ActualMessageDelay' '{print $2}')
done

exit 0

```

在市场剧烈波动的时候
ActualMessageDelay=-0.2 seconds中的数字 会经常达到40到60秒 软件已经完全不能使用
我也有使用netdata[https://github.com/netdata/netdata] 来监控ds13的延迟情况[其他域名除了两个barchart的ip 均无法ping] 没有出现任何丢包的情况
