---
layout: post
title: "数据类型"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-2.png
---

## <span style="color: rgb(0,191,255);">**基本内置类型**</span>

C++ 提供了丰富的内置数据类型供程序员使用，同时也支持用户自定义数据类型。下表列出了七种基本的 C++ 数据类型：

| 类型         | 关键字    |
| ------------ | --------- |
| 布尔型       | `bool`    |
| 字符型       | `char`    |
| 整型         | `int`     |
| 浮点型       | `float`   |
| 双精度浮点型 | `double`  |
| 无类型       | `void`    |
| 宽字符型     | `wchar_t` |

其中，`wchar_t` 是通过 `typedef` 定义的：

```cpp
typedef short int wchar_t;
```

所以，`wchar_t` 占用的空间和 `short int` 一样。

某些基本类型可以使用修饰符进行修饰，如：

- `signed`
- `unsigned`
- `short`
- `long`

### <span style="color: rgb(0,191,255);">**数据类型的内存占用**</span>

下表显示了不同类型的数据在内存中占用的字节数，以及其对应的最大值和最小值。

注意：不同系统可能会有所不同。通常，1 字节等于 8 位。

| 类型                 | 内存（字节） | 范围                                        |
| -------------------- | ------------ | ------------------------------------------- |
| `char`               | 1            | -128 到 127 或 0 到 255                     |
| `unsigned char`      | 1            | 0 到 255                                    |
| `signed char`        | 1            | -128 到 127                                 |
| `int`                | 4            | -2147483648 到 2147483647                   |
| `unsigned int`       | 4            | 0 到 4294967295                             |
| `signed int`         | 4            | -2147483648 到 2147483647                   |
| `short int`          | 2            | -32768 到 32767                             |
| `unsigned short int` | 2            | 0 到 65535                                  |
| `signed short int`   | 2            | -32768 到 32767                             |
| `long int`           | 8            | -9223372036854775808 到 9223372036854775807 |
| `signed long int`    | 8            | -9223372036854775808 到 9223372036854775807 |
| `unsigned long int`  | 8            | 0 到 18446744073709551615                   |
| `float`              | 4            | ±3.4e ± 38 (~7 位数字)                      |
| `double`             | 8            | ±1.7e ± 308 (~15 位数字)                    |
| `long long`          | 8            | -9223372036854775807 到 9223372036854775807 |
| `long double`        | 16           | 128 位内存空间，提供约 18-19 位有效数字     |
| `wchar_t`            | 2 或 4       | 1 个宽字符                                  |

### <span style="color: rgb(0,191,255);">**系统位数与数据类型大小**</span>

各种类型的数据存储大小与系统位数有关，目前大部分系统采用 64 位架构。下表展示了 32 位和 64 位系统下某些数据类型的存储差异（以 Windows 为例）：

| 类型        | 32 位系统 | 64 位系统 |
| ----------- | --------- | --------- |
| `char`      | 1 字节    | 1 字节    |
| `int`       | 4 字节    | 4 字节    |
| `long`      | 4 字节    | 8 字节    |
| `long long` | 8 字节    | 8 字节    |
| `size_t`    | 4 字节    | 8 字节    |

#### <span style="color: rgb(0,191,255);">**示例程序**</span>

以下是一个示例程序，输出计算机上各种数据类型的大小和范围。

```cpp
#include<iostream>  
#include <limits>
using namespace std;  
int main()  
{  
    cout << "type: \t\t" << "************size**************" << endl;  
    cout << "bool: \t\t" << "所占字节数：" << sizeof(bool);  
    cout << "\t最大值：" << (numeric_limits<bool>::max)();  
    cout << "\t最小值：" << (numeric_limits<bool>::min)() << endl;  
    cout << "char: \t\t" << "所占字节数：" << sizeof(char);  
    cout << "\t最大值：" << (numeric_limits<char>::max)();  
    cout << "\t最小值：" << (numeric_limits<char>::min)() << endl;  
    // 省略其余类型的输出代码...
    return 0;  
}
```

运行此代码时，输出将根据计算机的具体配置有所不同。

<span style="color: rgb(153,50,204);">**`typedef` 声明**</span>

通过 `typedef`，你可以为已有的类型取一个新名字。语法如下：

```cpp
typedef type newname;
```

例如，将 `int` 类型重新命名为 `feet`：

```cpp
typedef int feet;
feet distance; // 合法声明
```

## <span style="color: rgb(0,191,255);">**枚举类型**</span>

枚举（`enum`）是 C++ 中的一种派生数据类型，允许你为变量指定一组有限的值。其定义格式如下：

```cpp
enum 枚举名 { 标识符[=整型常数], 标识符[=整型常数], ... } 枚举变量;
```

例如，定义一个颜色枚举：

```cpp
enum color { red, green, blue } c;
c = blue; // 给变量 c 赋值为 blue
```

默认情况下，`red` 的值为 0，`green` 为 1，`blue` 为 2。如果你想自定义某个值，可以这样做：

```cpp
enum color { red, green=5, blue };
```

在这个例子中，`green` 的值为 5，而 `blue` 的值为 6。

## <span style="color: rgb(0,191,255);">**类型转换**</span> 

类型转换是将一个数据类型的值转换为另一种数据类型的值。在 C++ 中，有四种类型转换方式：

#### <span style="color: rgb(32,178,170);">**1. 静态转换（`static_cast`）**</span>  

静态转换用于将相似类型的值转换为另一种类型的值。例如，将 `int` 转换为 `float`：

```cpp
int i = 10;
float f = static_cast<float>(i); // 静态转换
```

#### <span style="color: rgb(32,178,170);">**2. 动态转换（`dynamic_cast`）**</span> 

动态转换通常用于将基类指针或引用转换为派生类指针或引用。它在运行时进行类型检查，若转换失败，返回空指针或抛出异常：

```cpp
class Base {};
class Derived : public Base {};
Base* ptr_base = new Derived;
Derived* ptr_derived = dynamic_cast<Derived*>(ptr_base);
```

#### <span style="color: rgb(32,178,170);">**3. 常量转换（`const_cast`）**</span> 

常量转换用于去除对象的 `const` 属性，将 `const` 类型的对象转换为非 `const` 类型：

```cpp
const int i = 10;
int& r = const_cast<int&>(i); // 将 const int 转换为 int
```

#### <span style="color: rgb(32,178,170);">**4. 重新解释转换（`reinterpret_cast`）**</span> 

重新解释转换用于将一个数据类型的值强制转换为另一个数据类型的值。此转换通常没有任何类型检查，因此可能会导致未定义行为：

```cpp
int i = 10;
float f = reinterpret_cast<float&>(i); // 强制将 int 转换为 float
```