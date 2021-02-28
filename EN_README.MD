标题 中国大陆连接sierrachart denali data feed延迟严重
这种延迟严重的情况只会出现在市场出现巨大波动的时候
我使用软件的环境是gentoo linux 下运行的wine 6.3[https://github.com/Kron4ek/wine-portable-executable]
网络环境因为处在中国大陆 使用了vpn方案[wireguard + tinyfecVPN]
具体是把从两个域名解析到的所有IP放进去特定的ipset 再把ipset里面的IP流量全部定向到vpn tunnel上
已经打开了denali的数据压缩功能 在eurex和hkfe上面从来没有遇到过延迟严重的问题
我从日志中看到 在打开压缩功能之后 程序会从ds13.sierracharts.com下载数据
我不使用VPN的情况:
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
然后打开程序记录log到文件的功能
执行如下
#!/bin/bash

WAIT=5

while true
do
        sleep $WAIT

        echo ActualMessageDelay$(cat /mnt/nvme/sierrachart/Logs/Message\ Log* | grep "SC Data - All Services | Heartbeat from server" | tail -1 | awk -F 'ActualMessageDelay' '{print $2}')
done

exit 0
在市场剧烈波动的时候
ActualMessageDelay=-0.2 seconds中的数字 会经常达到40到60秒 软件已经完全不能使用
我也有使用netdata[https://github.com/netdata/netdata] 来监控ds13的延迟情况[其他域名除了两个barchart的ip 均无法ping] 没有出现任何丢包的情况
