---
layout: post
title: "函数"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-8.png

---

# <span style="color: rgb(255,127,80);">**函数**</span>

函数是执行特定任务的一组语句。每个 C++ 程序都至少有一个函数，即 `main()` 函数。除了 `main()` 函数，您还可以根据需要定义其他函数。

将代码划分成多个函数有助于提高程序的结构性和可读性。通常，我们会根据每个函数执行的特定任务来划分代码。

### <span style="color: rgb(0,191,255);">**函数声明与定义**</span>

在 C++ 中，函数由 **声明** 和 **定义** 两部分组成。

- **函数声明** 告诉编译器函数的名称、返回类型和参数列表。
- **函数定义** 提供了函数的实际实现，包含函数主体。

### <span style="color: rgb(0,191,255);">**函数定义的一般形式**</span>

```cpp
return_type function_name(parameter list)
{
   // 函数主体
}
```

其中的组成部分包括：

- **返回类型**：指定函数返回值的数据类型。如果函数不返回值，使用 `void`。
- **函数名称**：函数的名字，和参数列表一起构成函数签名。
- **参数列表**：定义函数接受的参数，可以是零个或多个。每个参数由类型和名称组成。
- **函数主体**：函数的实际操作逻辑，包含一组语句。

### <span style="color: rgb(238,130,238);">**示例：最大值函数**</span>

以下是一个求两个整数中较大值的函数 `max()`：

```cpp
// 函数返回两个数中较大的那个数
int max(int num1, int num2) 
{
   // 局部变量声明
   int result;
   if (num1 > num2)
      result = num1;
   else
      result = num2;
   return result;
}
```

该函数接受两个整数参数 `num1` 和 `num2`，并返回较大的数。

### <span style="color: rgb(0,191,255);">**函数声明**</span>

函数声明用于告诉编译器如何调用一个函数，包括函数名和参数类型，而不涉及函数的具体实现。函数声明的一般形式为：

```cpp
return_type function_name(parameter list);
```

对于 `max()` 函数，声明如下：

```cpp
int max(int num1, int num2);
```

**注意**：在函数声明中，参数的名称并非必须，只有参数的类型是必要的。例如，下面的声明也是有效的：

```cpp
int max(int, int);
```

如果您在一个文件中定义了函数，并在另一个文件中调用它，那么需要在调用前声明该函数。

### <span style="color: rgb(0,191,255);">**调用函数**</span>

在程序中，我们通过调用函数来执行已定义的任务。当函数被调用时，程序的控制权转移到被调用的函数。当函数完成任务后，控制权会返回给主程序。

例如，下面的代码展示了如何调用 `max()` 函数：

```cpp
#include <iostream>
using namespace std;
// 函数声明
int max(int num1, int num2);
int main()
{
   int a = 100;
   int b = 200;
   int ret;
   // 调用函数来获取最大值
   ret = max(a, b);
   cout << "Max value is : " << ret << endl;
   return 0;
}
// 函数定义
int max(int num1, int num2)
{
   int result;
   if (num1 > num2)
      result = num1;
   else
      result = num2;
   return result;
}
```

<span style="color: rgb(238,130,238);">**输出结果：**</span>

```yaml
Max value is : 200
```

### <span style="color: rgb(0,191,255);">**函数参数**</span>

函数可以使用参数进行灵活操作。参数可以通过三种方式传递给函数：

1. **传值调用**：将实际值传递给形式参数。函数内修改形式参数不会影响实际参数。
2. **指针调用**：将参数的地址传递给函数，函数通过指针修改实际参数。
3. **引用调用**：将参数的引用传递给函数，函数修改引用会直接影响实际参数。

### <span style="color: rgb(0,191,255);">**参数的默认值**</span>

C++ 允许为函数参数指定默认值。若调用函数时未提供某个参数，则会使用默认值。

例如，下面的 `sum()` 函数为第二个参数指定了默认值：

```cpp
#include <iostream>
using namespace std;

int sum(int a, int b = 20)
{
  return a + b;
}

int main()
{
   int a = 100;
   int b = 200;
   int result;

   // 调用函数，传入两个参数
   result = sum(a, b);
   cout << "Total value is : " << result << endl;

   // 调用函数，只传入一个参数
   result = sum(a);
   cout << "Total value is : " << result << endl;

   return 0;
}
```

<span style="color: rgb(238,130,238);">**输出结果：**</span>

```yaml
Total value is : 300
Total value is : 120
```

### <span style="color: rgb(0,191,255);">**Lambda 函数与表达式**</span>

C++11 引入了 Lambda 函数（也叫 Lambda 表达式），它可以在不定义完整函数的情况下，直接在代码中定义并执行功能。

Lambda 表达式的基本形式如下：

```cpp
[capture](parameters) -> return_type { body }
```

- **capture**：指定外部变量的访问方式（按值传递或按引用传递）。
- **parameters**：函数参数（可选）。
- **return_type**：返回类型（可选）。
- **body**：函数体。

#### <span style="color: rgb(32,178,170);">**示例 1：简单 Lambda 表达式**</span> 

```cpp
auto lambda = [](int x, int y) { return x + y; };
cout << lambda(5, 10) << endl; // 输出 15
```

#### <span style="color: rgb(32,178,170);">**示例 2：带默认值的 Lambda 表达式**</span> 

```cpp
int x = 10, y = 20;
auto lambda = [x, &y]() { y = x + y; };
lambda();
cout << y << endl; // 输出 30
```

在 Lambda 表达式中，`[]` 部分用来捕获外部变量。如果没有捕获任何外部变量，可以写成 `[]`，如果需要捕获外部变量，则可以指定捕获方式（按值传递 `=`，按引用传递 `&`）。

#### <span style="color: rgb(32,178,170);">**示例 3：使用 `this` 指针的 Lambda 表达式**</span> 

如果 Lambda 表达式要访问类中的成员函数或变量，可以显式传入 `this` 指针：

```cpp
class Example {
public:
    void show() {
        auto lambda = [this]() { cout << this->x << endl; };
        lambda();
    }

private:
    int x = 100;
};
```