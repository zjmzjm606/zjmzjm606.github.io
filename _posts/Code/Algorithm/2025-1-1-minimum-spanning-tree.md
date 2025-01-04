---
layout: post
title: "浅谈最小生成树"
author: "ZJM"
categories: code/algorithm
tags: [Code]
image: algorithm-cover-2.png
---
## 浅谈最小生成树

#### 事先声明：这篇文章只能给初学者稍加学习，仅供参考。本文主讲算法而不是代码。

 # 浅谈最小生成树

## 一.什么是最小生成树

首先我们得给出一张图：

假设我们常常去这几个地方。(~~地图上随便找的几个点~~)

想象一下：自己是奇异博士的弱化版。

这些地方之间肯定两两之间都会有传送门。

假设在这几个点有传送门，可以传到几个固定的位置，但会有不同的费用。

虽然我们会有很多种选择路的方式，但是我们希望选择的路的**费用之和**最小，且通过这些路能从**任意一个地方到达另外一个地方**。

于是求这个**最短长度(费用)的方法和方案**就是我们今天的主题： **最小生成树**。

## 二.最小生成树两大算法
### Ⅰ.前序知识 

1.最小生成树的**定义**：在一个带权的物向连通图中，各边权和最小的一棵生成树即为原图的最小生成树。

*****：**生成树**：如果连通图 G的一个子图是一棵包含G 的所有顶点的树，则该子图称为G的生成树

2.(1)生成树的属性(特性):

假设有|V|个点

①无环

②连通

③从任意一点到另一点有唯一路径(不然可以把多余的边删掉)

④删去一条边后则不连通(理由同上)

⑤有|V|-1条边(由③④得出)

(2)最小生成树的**独特特性**

①**最小边原则：如果图中最小的边是唯一的话，一定在最小生成树上。**

**证明**：由于最小生成树只需|V|-1条边，所以当得到了一棵生成树时，若不包含最短的边，便可将以选好的边中删去一条连接最短边上两点中的一点与其它点的边，则最短边上选取的那点便与其它点不连通，再连上最短的边，又联通了，且因为连接
的边是最短边，所以边权之和一定比原边权之和小。

②唯一性定理：如果图中的边权值都不同，则图中的最小生成树是唯一的。

证明：当此生成树所连的边之和最小时，因为边权值各不相同，所以将另一边来替代此生成树中的一边，会有两种情况：1.一个边权更大的生成树； 2.各点不连通了
	均不符合最小生成树定义。
    
### Ⅱ.Prim算法

Prim算法(Robert C. Prim)是一种贪心算法，它的方法是将所有点分成两部分。用过的和没用过的(已在生成树内的和不在的)

①步骤：它先是任意选择一个点，以这个点作为出发点。

再向四周扩展，找到与这个点连接的点中最近的那个，连接边。

下一步是寻找与已联通的树最近的未使用(不在生成树内)的点并将边连接，此点标记为使用过(已在生成树中)。

重复上一步操作直到所有点都在使用过部分(都用过了，连通了)。

(图)

②证明:假设当前已使用的点集为n,剩下的点集为m。

设连接n和m的最小代价为(x,y)

若取的是连接n,m的另外一边(P,Q),则删去(P,Q),加入(x,y),n和m也一定是连通的，且连(x,y)的话得到的当前边权和会更小，更优。所以连最小边(x,y)是保证能得到最小生成树的。算法正确。

③代码实现(核心)(c++)(仅供参考):

复杂度：O(N^2) 过于缓慢，容易被卡(第一个N为枚举各个点，第二个N为寻找最短的边)

④优化:

怎样优化?

第一层是无法优化的,只能靠第二层了。

优化目的:快速找到权值最小的边。

优化方法:借助于堆排序。

用堆来保存用过的点到没用过的点得最短边长，在访问时不断更新和维护。

优化效果:找权值最小的边：O(logm)

总复杂度:O((n+m)logm)

代码实现(核心):

## Ⅲ.Kruskal算法

Kruskal算法还是一种贪心算法，它的方法是将所有的边按长度从小到大排序，从最小的边开始，若边连接的两点不连通，则连接这条边，否则就不连。

①步骤:首先，将所有边按权值进行排序。

按照权值从小到大选边。如果当前选的边的两点不连通，就连接这条边。否则就不连接。

直到所有边都被枚举一遍。

②证明:从小到大的枚举边时,保证了生成树的最小性。

如果有一条边,由它构成的生成树比Kruskal算法的生成树的权值和更小，那么它肯定用到了比算法更短的边(可能多条),但由于Kruskal在枚举边前已经将所有的边排了序,故比算法得到生成树更短的边会排在前面而被选中或排除，故不可能有这样的边，算法的生成树肯定是最小生成树。判断两点是否连通就保证了最小生成树中无环，肯定是正确的。
      
③优化：这个方法不优化实在太慢了，判断是否连通如果用暴力的话将无法想象，k肯定TLE

于是我们用并查集来判断是否连通。

只需要用模板并查集就可以了。

(因为本章主讲最小生成树，并查集的内容可以通过前期的模板进行学习)

核心代码：

```
#include<iostream>
#include<cstring>
#include<string>
#include<cstdio>
#include<cstdlib>
#include<algorithm>
#include<cmath>
#define For(k,i,j) for(int k=i;k<=j;k++)
using namespace std;
inline int read()
{
    char ch;
    int res=1;
    while((ch=getchar())<'0'||ch>'9') if(ch=='-') res=-1;
    res*=ch-48;
    while((ch=getchar())>='0'&&ch<='9')
        res=res*10+ch-48;
    return res;
}
struct point
{
	int x,y,d;
};
point a[200005];
int fa[5001];
int find(int x)
{
	if(fa[x]==x)
		return x;
	else
		return fa[x]=find(fa[x]);
}
bool cmp(point f,point g)
{
	return f.d<g.d;
}
int main()
{
    int n=read(),m=read(),k,ans=0;
    For(i,1,n)
		fa[i]=i;
    For(i,1,m)
    	a[i].x=read(),a[i].y=read(),a[i].d=read();
    sort(a+1,a+m+1,cmp);
    For(i,1,m)
    {
    	int ha=find(a[i].x);
    	int hb=find(a[i].y);
    	if(ha!=hb)
    	{
    		fa[hb]=ha;
    		ans+=a[i].d;
    	}
    }
    printf("%d",ans);
    return 0;
}
```

复杂度：O(mlogm+mα(n)),α(n)是一次并查集的复杂度。

再加一个小小的优化（也不算优化了，只是一个正常剪枝）加一个tot记录已选用的边数，如果到了|V|-1条边便可以break掉

核心代码：
```
#include<iostream>
#include<cstring>
#include<string>
#include<cstdio>
#include<cstdlib>
#include<algorithm>
#include<cmath>
#define For(k,i,j) for(int k=i;k<=j;k++)
using namespace std;
inline int read()
{
    char ch;
    int res=1;
    while((ch=getchar())<'0'||ch>'9') if(ch=='-') res=-1;
    res*=ch-48;
    while((ch=getchar())>='0'&&ch<='9')
        res=res*10+ch-48;
    return res;
}
struct point
{
	int x,y,d;
};
point a[200005];
int fa[5001];
int find(int x)
{
	if(fa[x]==x)
		return x;
	else
		return fa[x]=find(fa[x]);
}
bool cmp(point f,point g)
{
	return f.d<g.d;
}
int main()
{
    int n=read(),m=read(),k,ans=0;
    For(i,1,n)
		fa[i]=i;
    For(i,1,m)
    	a[i].x=read(),a[i].y=read(),a[i].d=read();
    sort(a+1,a+m+1,cmp);
    int tot=0;
    For(i,1,m)
    {
    	int ha=find(a[i].x);
    	int hb=find(a[i].y);
    	if(ha!=hb)
    	{
    		fa[hb]=ha;
    		ans+=a[i].d;
    		tot++;
    	}
    	if(tot==n-1)
    		break;
    }
    printf("%d",ans);
    return 0;
}
```


时间前后对比：（也就快了那么一点点）

三.有关最小生成树的拓展
Ⅰ.次小生成树:
①
②