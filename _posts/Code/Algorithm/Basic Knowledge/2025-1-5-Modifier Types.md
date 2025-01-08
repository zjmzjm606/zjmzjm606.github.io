---
layout: post
title: "修饰符类型"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-6.png
---


# <span style="color: rgb(255,127,80);">**修饰符**</span>


C++ 允许在基本数据类型（如 `char`、`int` 和 `double`）前使用修饰符，这些修饰符用于改变变量的行为，以满足不同的需求。修饰符提供了更多的灵活性和可定制性。

## <span style="color: rgb(0,191,255);">**常见的 C++ 数据类型修饰符**</span>

### <span style="color: rgb(32,178,170);">**1. `signed`**</span> 
- 表示变量可以存储负数。
- 对于整型变量来说，`signed` 是默认值，因此通常可以省略。

### <span style="color: rgb(32,178,170);">**2. `unsigned`**</span> 
- 表示变量不能存储负数。
- 对于整型变量，`unsigned` 修饰符可以将变量的范围扩大一倍。

### <span style="color: rgb(32,178,170);">**3. `short`**</span> 
- 表示变量的范围比 `int` 更小。
- `short int` 可以简写为 `short`。

### <span style="color: rgb(32,178,170);">**4. `long`**</span> 
- 表示变量的范围比 `int` 更大。
- `long int` 可以简写为 `long`。

### <span style="color: rgb(32,178,170);">**5. `long long`**</span> 
- 表示变量的范围比 `long` 更大。
- 这是 C++11 中新增的数据类型修饰符。

### <span style="color: rgb(32,178,170);">**6. `float`**</span> 
- 表示单精度浮点数。

### <span style="color: rgb(32,178,170);">**7. `double`**</span> 
- 表示双精度浮点数。

### <span style="color: rgb(32,178,170);">**8. `bool`**</span> 
- 表示布尔类型，只有 `true` 和 `false` 两个值。

### <span style="color: rgb(32,178,170);">**9. `char`**</span> 
- 表示字符类型。

### <span style="color: rgb(32,178,170);">**10. `wchar_t`**</span> 
- 表示宽字符类型，可以存储 Unicode 字符。

### <span style="color: rgb(0,191,255);">**修饰符的组合使用**</span>

- `signed`、`unsigned`、`long` 和 `short` 可以组合使用，且适用于整型。
- `signed` 和 `unsigned` 可以应用于字符型（`char`）。
- `long` 可应用于双精度型（`double`）。

<span style="color: rgb(238,130,238);">**例如：**</span>

```cpp
unsigned long int num; // 无符号长整型
```

C++ 还支持速记符号，可以省略 `int`，只写 `unsigned`、`short` 或 `long`，`int` 是隐含的。以下是一些例子：

```cpp
signed int num1 = -10; // 有符号整型
unsigned int num2 = 20; // 无符号整型

short int num1 = 10; // 短整型
long int num2 = 100000; // 长整型

long long int num1 = 10000000000; // 长长整型

float num1 = 3.14f; // 单精度浮点数
double num2 = 2.71828; // 双精度浮点数

bool flag = true; // 布尔类型
char ch1 = 'a'; // 字符类型
wchar_t ch2 = L'你'; // 宽字符类型
```

### <span style="color: rgb(0,191,255);">**有符号整数和无符号整数的差别**</span>

为了更好地理解有符号整数和无符号整数之间的区别，我们来看一个简单的例子：

```cpp
#include <iostream>
using namespace std;

int main() {
   short int i;           // 有符号短整数
   short unsigned int j;  // 无符号短整数

   j = 50000;
   i = j;

   cout << i << " " << j;
   return 0;
}
```

<span style="color: rgb(238,130,238);">**输出结果：**</span>

```
-15536 50000
```

在这个程序中，无符号短整数 `50000` 的位模式被解释为有符号短整数，导致输出为 `-15536`。

## <span style="color: rgb(0,191,255);">**C++ 中的类型限定符**</span>

类型限定符提供了关于变量的附加信息，用于改变变量或函数的默认行为。常见的类型限定符如下：

### <span style="color: rgb(32,178,170);">**1. `const`**</span> 

- 用于定义常量，表示该变量的值不能被修改。

<span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
const int NUM = 10; // NUM 是常量，值不能修改
const int* ptr = &NUM; // 指向常量的指针，指针指向的值不可修改
```

### <span style="color: rgb(32,178,170);">**2. `volatile`**</span> 

- 用于修饰变量，表示该变量的值可能会被程序外部的因素改变，如硬件或其他线程。

<span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
volatile int num = 20; // 变量 num 可能在任何时刻被外部修改
```

### <span style="color: rgb(32,178,170);">**3. `restrict`**</span> 

- 仅适用于指针，表示该指针是访问其所指对象的唯一方式。`restrict` 是 C99 中引入的限定符。

### <span style="color: rgb(32,178,170);">**4. `mutable`**</span> 

- 用于修饰类的成员变量，表示即使对象本身是 `const`，该成员变量仍然可以被修改。

<span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
class Example {
public:
    int get_value() const {
        return value_; // const 函数不能修改数据成员
    }
    void set_value(int value) const {
        value_ = value; // mutable 允许在 const 成员函数中修改成员变量
    }

private:
    mutable int value_;
};
```

### <span style="color: rgb(32,178,170);">**5. `static`**</span> 

- 用于定义静态变量，表示变量的作用域仅限于当前文件或当前函数内，不会被其他文件或函数访问。

<span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
void example_function()
{
    static int count = 0; // count 是静态变量，程序生命周期内都存在
    count++;
}
```

### <span style="color: rgb(32,178,170);">**6. `register`**</span> 

- 用于定义寄存器变量，表示该变量被频繁使用，可以存储在 CPU 的寄存器中，以提高程序的运行效率。但是否实际存储在寄存器中由编译器决定。

<span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
void example_function(register int num)
{
    // register 提示编译器将变量存储在寄存器中
}
```
