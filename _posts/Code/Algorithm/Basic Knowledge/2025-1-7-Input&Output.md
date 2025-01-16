---
layout: post
title: "基本的输入输出"
author: "ZJM" 
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-8.png
---

# <span style="color: rgb(255,127,80);">**基本的输入输出**</span> 

C++ 标准库提供了强大的输入/输出（I/O）功能，本章将介绍 C++ 中最基本和最常用的 I/O 操作。

在 C++ 中，所有的 I/O 操作都依赖于流（stream）。流可以看作是一系列字节的传输路径。根据字节流的方向，I/O 操作分为两种类型：

- **输入操作**：从外部设备（如键盘、磁盘、网络等）读取数据到程序中。
- **输出操作**：将程序中的数据输出到外部设备（如显示屏、打印机、磁盘、网络等）。

### <span style="color: rgb(0,191,255);">**I/O 库头文件**</span>

在 C++ 中，几个头文件提供了不同的 I/O 功能：

| 头文件         | 功能说明 |
|----------------|----------|
| `<iostream>`   | 定义了 `cin`、`cout`、`cerr` 和 `clog` 对象，分别用于标准输入流、标准输出流、非缓冲标准错误流和缓冲标准错误流。 |
| `<iomanip>`    | 提供流操纵器，如 `setw` 和 `setprecision`，用于控制输出格式。 |
| `<fstream>`    | 提供文件输入输出流，用于处理文件 I/O 操作。 |

### <span style="color: rgb(0,191,255);">**标准输出流（`cout`）**</span>

`cout` 是一个预定义的对象，它是 `iostream` 类的一个实例。`cout` 与标准输出设备（通常是显示屏）连接。`cout` 与流插入运算符 `<<` 配合使用，进行数据的输出。

#### <span style="color: rgb(32,178,170);">**示例 1: 输出字符串**</span> 
```cpp
#include <iostream>
using namespace std;
int main()
{
    char str[] = "Hello C++";
    cout << "Value of str is : " << str << endl;
}
``` 
<span style="color: rgb(238,130,238);">**输出：**</span>
```yaml
Value of str is : Hello C++
```

在上面的代码中，`<<` 运算符用来将 `str` 输出到标准输出设备。`endl` 会在输出后添加一个换行符，并刷新输出缓冲区。

#### <span style="color: rgb(32,178,170);">**示例 2: 多次使用 `<<` 运算符**</span> 
```cpp
#include <iostream>
using namespace std;
int main()
{
    int x = 10;
    float y = 3.14;
    cout << "Integer: " << x << ", Float: " << y << endl;
}
```
<span style="color: rgb(238,130,238);">**输出：**</span>
```yaml
Integer: 10, Float: 3.14
```

### 标准输入流（`cin`）

`cin` 是另一个预定义对象，它同样是 `iostream` 类的实例。`cin` 与标准输入设备（通常是键盘）连接。`cin` 与流提取运算符 `>>` 配合使用，进行数据的输入。

#### 示例 3: 输入字符串
```cpp
#include <iostream>
using namespace std;

int main() {
    char name[50];
    cout << "请输入您的名称：";
    cin >> name;
    cout << "您的名称是： " << name << endl;
}
```
**输出：**
```
请输入您的名称： cplusplus
您的名称是： cplusplus
```

在此代码中，程序等待用户输入一个字符串。当用户输入完后按下回车键，输入的字符串会通过 `cin` 存储在 `name` 数组中，并输出到标准输出。

#### 示例 4: 输入多个数据
```cpp
#include <iostream>
using namespace std;

int main() {
    char name[50];
    int age;
    cout << "请输入您的名称和年龄：";
    cin >> name >> age;
    cout << "您的名称是： " << name << ", 年龄是： " << age << endl;
}
```
**输出：**
```
请输入您的名称和年龄： Alice 20
您的名称是： Alice, 年龄是： 20
```

### 标准错误流（`cerr`）

`cerr` 是一个预定义的对象，它也是 `iostream` 类的实例。`cerr` 与标准输出设备（通常是显示屏）连接，但是它是**非缓冲的**，意味着每次输出都会立即显示。

#### 示例 5: 输出错误信息
```cpp
#include <iostream>
using namespace std;

int main() {
    char str[] = "Unable to read file";
    cerr << "Error message: " << str << endl;
}
```
**输出：**
```
Error message: Unable to read file
```

### 标准日志流（`clog`）

`clog` 也是 `iostream` 类的实例。与 `cerr` 类似，它输出到标准输出设备，但与 `cerr` 不同的是，`clog` 是**缓冲的**，即输出内容会先存入缓冲区，直到缓冲区满或手动刷新才会显示。

#### 示例 6: 输出日志信息
```cpp
#include <iostream>
using namespace std;

int main() {
    char str[] = "Processing started...";
    clog << "Log message: " << str << endl;
}
```
**输出：**
```
Log message: Processing started...
```

### `cout`、`cerr` 和 `clog` 的区别

- `cout` 用于常规的输出操作，输出到标准屏幕。
- `cerr` 用于错误信息的输出，并且是非缓冲的，每次输出都立即显示。
- `clog` 用于日志信息的输出，并且是缓冲的，输出会先存储在缓冲区，直到缓冲区填满或者手动刷新时才显示。

### 小结

- `cout` 用于正常输出，通常用于显示程序的结果。
- `cerr` 用于输出错误信息，适合显示程序出错时的信息。
- `clog` 用于输出日志信息，可以缓冲输出，适合记录程序执行过程中的一些事件。

通过合理使用这些流，我们可以更清晰地组织和管理程序的输入输出操作，尤其是在大型程序中，区分正常输出、错误信息和日志信息是非常重要的。

---

这个版本增加了详细的示例，解释了每个流的用途，并且通过多个代码实例帮助用户更好地理解各个流的不同特性。如果你有任何进一步的问题或需要更多的例子，可以告诉我！