---
layout: post
title: "P2911 [USACO08OCT] Bovine Bones G"
author: "ZJM"
categories: code/luogu/arrays
tags: [Code]
image: code-cover-13.png
---
```cpp
#include<iostream>
#include<cstdio>
using namespace std;
int b[85],c[88888];
int main()
{
    int a[4];
    int i,j,k,max=-1;
    scanf("%d%d%d",&a[1],&a[2],&a[3]);
    for(i=1;i<=a[1];i++)
        for(j=1;j<=a[2];j++)
            for(k=1;k<=a[3];k++)
            {
                b[i+j+k]++;
            }
    for(i=3;i<=85;i++)
        if(b[i]>max)
            {
                max=b[i];
                c[max]++;
                if(c[max]==1)
                    k=i;
            }
    printf("%d",k);
    return 0;
}
```
