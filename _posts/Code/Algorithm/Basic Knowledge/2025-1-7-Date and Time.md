---
layout: post
title: "日期与时间"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-8.png
---


# <span style="color: rgb(255,127,80);">**日期与时间**</span>

在 C++ 中，没有直接的日期类型，标准库主要依赖于 C 语言中的日期和时间处理方式。因此，为了操作日期和时间，你需要在程序中引入 `<ctime>` 头文件。

C++ 提供了四种与时间相关的类型：`clock_t`、`time_t`、`size_t` 和 `tm`。其中，`clock_t`、`size_t` 和 `time_t` 用整数来表示系统时间和日期，而 `tm` 结构则以更为直观的方式存储日期和时间的各个组成部分。

### <span style="color: rgb(0,191,255);">**`tm` 结构**</span>

`tm` 结构是 C/C++ 中用于存储日期和时间的结构体，其定义如下：

```cpp
struct tm
{
  int tm_sec;   // 秒，范围 0 到 59（但有时允许到 61）
  int tm_min;   // 分钟，范围 0 到 59
  int tm_hour;  // 小时，范围 0 到 23
  int tm_mday;  // 日，范围 1 到 31
  int tm_mon;   // 月，范围 0 到 11（0 代表 1 月，11 代表 12 月）
  int tm_year;  // 年，从 1900 年起算
  int tm_wday;  // 星期几，范围 0 到 6（0 代表星期天）
  int tm_yday;  // 一年中的第几天，范围 0 到 365
  int tm_isdst; // 夏令时标识（非零表示启用夏令时）
};
```

### <span style="color: rgb(0,191,255);">**常用的时间函数**</span>

C++ 标准库提供了一些与时间相关的函数，使用时可以参考下表：

| 函数 | 描述 |
| --- | --- |
| `time_t time(time_t *time);` | 返回当前日历时间，自 1970 年 1 月 1 日以来的秒数。 |
| `char* ctime(const time_t *time);` | 将 `time_t` 类型的时间转换为字符串表示，格式为：`day month date hours:minutes:seconds year\n\0`。 |
| `struct tm* localtime(const time_t *time);` | 返回本地时间的 `tm` 结构指针。 |
| `clock_t clock(void);` | 返回程序运行时的处理器时间。 |
| `char* asctime(const struct tm *time);` | 将 `tm` 结构转换为字符串，格式为：`day month date hours:minutes:seconds year\n\0`。 |
| `struct tm* gmtime(const time_t *time);` | 返回与 UTC（格林尼治标准时间）相关的 `tm` 结构指针。 |
| `time_t mktime(struct tm *time);` | 将 `tm` 结构转换为 `time_t` 类型的日历时间。 |
| `double difftime(time_t time2, time_t time1);` | 返回两个时间点之间的秒数差。 |
| `size_t strftime();` | 用指定格式输出日期和时间。 |

### <span style="color: rgb(0,191,255);">**获取当前日期和时间**</span>

以下是一个示例程序，展示如何获取当前日期和时间，包括本地时间和协调世界时（UTC）。

```cpp
#include <iostream>
#include <ctime>
using namespace std;
int main()
{
    // 获取当前时间（自1970年1月1日以来的秒数）
    time_t now = time(0);
    // 将当前时间转换为字符串形式
    char* dt = ctime(&now);
    cout << "本地日期和时间：" << dt << endl;
    // 获取UTC时间
    tm* gmtm = gmtime(&now);
    dt = asctime(gmtm);
    cout << "UTC 日期和时间：" << dt << endl;
}
```

<span style="color: rgb(238,130,238);">**输出示例**：</span>

```yaml
本地日期和时间：Sat Jan  8 20:07:41 2011
UTC 日期和时间：Sun Jan  9 03:07:41 2011
```

### <span style="color: rgb(0,191,255);">**使用 `tm` 结构格式化时间**</span>

`tm` 结构在 C/C++ 中处理日期和时间时非常有用。你可以访问结构中的各个成员来获取时间的详细信息。下面是一个使用 `tm` 结构的示例：

```cpp
#include <iostream>
#include <ctime>
using namespace std;
int main()
{
    // 获取当前时间
    time_t now = time(0);
    cout << "1970 到目前经过的秒数: " << now << endl;
    // 将时间转换为本地时间（tm结构）
    tm* ltm = localtime(&now);
    // 输出 tm 结构的各个组成部分
    cout << "年: " << 1900 + ltm->tm_year << endl;
    cout << "月: " << 1 + ltm->tm_mon << endl;
    cout << "日: " << ltm->tm_mday << endl;
    cout << "时间: " << ltm->tm_hour << ":";
    cout << ltm->tm_min << ":";
    cout << ltm->tm_sec << endl;
}
```

<span style="color: rgb(238,130,238);">****输出示例**：**</span>

```yaml
1970 到目前经过的秒数: 1503564157
年: 2017
月: 8
日: 24
时间: 16:42:37
```

在上面的代码中，我们用 `1900 + ltm->tm_year` 来获取实际的年份，因为 `tm_year` 存储的是从 1900 年起的年份偏移量。同样地，用 `1 + ltm->tm_mon` 来计算实际月份，因为 `tm_mon` 的范围是从 0 到 11，表示从 1 月到 12 月。

### <span style="color: rgb(0,191,255);">**总结**</span>

在 C++ 中，处理日期和时间主要依赖于 `<ctime>` 头文件，使用 `time_t` 和 `tm` 等类型进行时间的表示和操作。通过相关函数，你可以轻松获取和格式化当前时间，以及进行日期与时间的计算。这些基础操作对于开发中需要时间功能的程序是非常常见的。