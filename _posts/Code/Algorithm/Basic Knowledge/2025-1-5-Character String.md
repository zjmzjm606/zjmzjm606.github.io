---
layout: post
title: "字符串"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-8.png
---

# <span style="color: rgb(255,127,80);">**字符串**</span>

C++ 提供了两种主要的字符串表示方式：

1. **C 风格字符串**
2. **C++ `string` 类**

下面将分别介绍这两种方式。

### <span style="color: rgb(0,191,255);">**C 风格字符串**</span>

C 风格字符串源自 C 语言，并且在 C++ 中也被广泛使用。它们实际上是以空字符 (`\0`) 终止的一维字符数组。因此，一个 C 风格的字符串包含了组成字符串的字符，最后由一个 `\0` 字符标记字符串的结束。

#### <span style="color: rgb(32,178,170);">**示例 1: 定义 C 风格字符串**</span> 

```cpp
#include <iostream>
using namespace std;
int main()
{
    // 通过字符数组定义字符串
    char site[7] = {'R', 'U', 'N', 'O', 'O', 'B', '\0'};
    cout << "网站名称: " << site << endl;
    return 0;
}
```

在这个示例中，我们定义了一个字符数组 `site`，包含了字符串 "RUNOOB"。由于 C 风格字符串的结束是由 `\0` 表示的，所以数组大小比字符串长度多一个字符。

#### <span style="color: rgb(32,178,170);">**更简洁的写法**</span> 

```cpp
#include <iostream>
using namespace std;
int main()
{
    // 直接使用字符串常量定义
    char site[] = "RUNOOB";
    cout << "网站名称: " << site << endl;
    return 0;
}
```

C++ 编译器会自动在字符串的末尾加上 `\0`，因此我们不需要手动添加。

#### <span style="color: rgb(32,178,170);">**示例 2: 使用字符串函数**</span> 

C++ 提供了一些函数来操作 C 风格字符串。以下是几个常见函数及其用途：

| 函数             | 目的                                                  |
| ---------------- | ----------------------------------------------------- |
| `strcpy(s1, s2)` | 将字符串 `s2` 复制到 `s1` 中。                        |
| `strcat(s1, s2)` | 将字符串 `s2` 连接到 `s1` 的末尾。                    |
| `strlen(s1)`     | 返回字符串 `s1` 的长度（不包括 `\0`）。               |
| `strcmp(s1, s2)` | 比较 `s1` 和 `s2` 字符串，返回值小于0、等于0或大于0。 |
| `strchr(s1, ch)` | 返回 `s1` 中第一次出现字符 `ch` 的位置。              |
| `strstr(s1, s2)` | 返回 `s1` 中第一次出现字符串 `s2` 的位置。            |

#### <span style="color: rgb(32,178,170);">**示例 3: 使用 C 风格字符串操作函数**</span> 

```cpp
#include <iostream>
#include <cstring>  // 引入字符串处理库
using namespace std;
int main()
{
    char str1[13] = "runoob";
    char str2[13] = "google";
    char str3[13];
    int len;
    // 复制 str1 到 str3
    strcpy(str3, str1);
    cout << "strcpy(str3, str1): " << str3 << endl;
    // 连接 str1 和 str2
    strcat(str1, str2);
    cout << "strcat(str1, str2): " << str1 << endl;
    // 获取 str1 的长度
    len = strlen(str1);
    cout << "strlen(str1): " << len << endl;
    return 0;
}
```

<span style="color: rgb(238,130,238);">**输出：**</span>

```yaml
strcpy(str3, str1): runoob
strcat(str1, str2): runoobgoogle
strlen(str1): 12
```

在这个例子中，`strcpy` 复制了字符串，`strcat` 将 `str2` 连接到 `str1`，而 `strlen` 返回了字符串的长度。

### <span style="color: rgb(0,191,255);">**C++ 中的 `string` 类**</span>

C++ 标准库提供了一个更加现代的字符串类——`string` 类。它不仅支持 C 风格字符串的常见操作，还提供了更多灵活和高效的方法。这里我们通过一个简单的例子来展示 `string` 类的基本用法。

#### <span style="color: rgb(32,178,170);">**示例 4: 使用 `string` 类**</span>

```cpp
#include <iostream>
#include <string>  // 引入 string 库
using namespace std;
int main()
{
    string str1 = "runoob";
    string str2 = "google";
    string str3;
    int len;
    // 复制 str1 到 str3
    str3 = str1;
    cout << "str3: " << str3 << endl;
    // 连接 str1 和 str2
    str3 = str1 + str2;
    cout << "str1 + str2: " << str3 << endl;
    // 获取 str3 的长度
    len = str3.size();
    cout << "str3.size(): " << len << endl;
    return 0;
}
```

<span style="color: rgb(238,130,238);">**输出：**</span>

```yaml
str3: runoob
str1 + str2: runoobgoogle
str3.size(): 12
```

与 C 风格字符串不同，C++ `string` 类会自动处理内存管理和字符数组的大小，因此操作更加方便和安全。