---
layout: post
title: "数字类型"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-8.png
---

# <span style="color: rgb(255,127,80);">**数字类型**</span>

在 C++ 中，我们可以使用多种数据类型来表示数字。常见的数字类型包括 `int`、`short`、`long`、`float` 和 `double`。这些数据类型在存储数字时具有不同的精度和范围，具体信息可以参考 C++ 数据类型一章。

### <span style="color: rgb(0,191,255);">**数字的定义**</span>

在 C++ 中，我们可以定义不同类型的数字变量，并赋予它们数值。以下是一个例子，展示了如何定义和初始化多种数字类型：

#### <span style="color: rgb(32,178,170);">**示例 1：数字定义和输出**</span>

```cpp
#include <iostream>
using namespace std;
int main()
{
    // 定义不同类型的数字
    short s;
    int i;
    long l;
    float f;
    double d;
    // 给数字赋值
    s = 10;      // short 类型
    i = 1000;    // int 类型
    l = 1000000; // long 类型
    f = 230.47;  // float 类型
    d = 30949.374; // double 类型
    // 输出数字值
    cout << "short  s: " << s << endl;
    cout << "int    i: " << i << endl;
    cout << "long   l: " << l << endl;
    cout << "float  f: " << f << endl;
    cout << "double d: " << d << endl;
    return 0;
}
```
#### <span style="color: rgb(238,130,238);">**输出：**</span>

```yaml
short  s: 10
int    i: 1000
long   l: 1000000
float  f: 230.47
double d: 30949.4
```

解释：这段代码展示了如何定义不同类型的数字，并将它们输出。注意 `float` 和 `double` 类型的数字会有一定的精度损失，输出时显示为近似值。

------

### <span style="color: rgb(0,191,255);">**C++ 数学运算**</span>

C++ 提供了许多内置的数学函数，可以帮助我们对数字进行计算。为了使用这些函数，我们需要包含 `cmath` 头文件。

#### <span style="color: rgb(32,178,170);">**常用数学函数**</span> 

| 函数            | 描述                                       |
| --------------- | ------------------------------------------ |
| `cos(double)`   | 返回弧度角的余弦值                         |
| `sin(double)`   | 返回弧度角的正弦值                         |
| `tan(double)`   | 返回弧度角的正切值                         |
| `log(double)`   | 返回参数的自然对数                         |
| `pow(x, y)`     | 返回 `x` 的 `y` 次方                       |
| `hypot(x, y)`   | 返回直角三角形斜边的长度（平方和的平方根） |
| `sqrt(double)`  | 返回参数的平方根                           |
| `abs(int)`      | 返回整数的绝对值                           |
| `fabs(double)`  | 返回浮点数的绝对值                         |
| `floor(double)` | 返回小于或等于参数的最大整数               |

#### <span style="color: rgb(0,191,255);">**示例 2：数学运算**</span>

```cpp
#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    // 定义不同类型的数字
    short s = 10;
    int i = -1000;
    long l = 100000;
    float f = 230.47;
    double d = 200.374;
    // 使用数学函数进行运算
    cout << "sin(d): " << sin(d) << endl;        // 正弦函数
    cout << "abs(i): " << abs(i) << endl;        // 整数的绝对值
    cout << "floor(d): " << floor(d) << endl;    // 向下取整
    cout << "sqrt(f): " << sqrt(f) << endl;      // 平方根
    cout << "pow(d, 2): " << pow(d, 2) << endl;  // d 的平方
    return 0;
}
```

#### <span style="color: rgb(238,130,238);">**输出：**</span>

```yaml
sin(d): -0.634939
abs(i): 1000
floor(d): 200
sqrt(f): 15.1812
pow(d, 2): 40149.7
```

解释：

- `sin(d)` 计算了变量 `d`（200.374）的正弦值。
- `abs(i)` 返回了变量 `i` 的绝对值。
- `floor(d)` 返回了 `d` 的向下取整结果。
- `sqrt(f)` 计算了变量 `f`（230.47）的平方根。
- `pow(d, 2)` 计算了变量 `d` 的平方。

------

### <span style="color: rgb(0,191,255);">**C++ 随机数**</span>

有时，我们需要在程序中生成随机数。C++ 提供了 `rand()` 函数来生成伪随机数，但需要先调用 `srand()` 来设置种子。通常，我们使用 `time()` 函数来获取系统当前时间作为种子。

#### <span style="color: rgb(32,178,170);">**示例 3：生成随机数**</span> 

```cpp
#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;
int main()
{
    int i, j;
    // 设置随机数种子
    srand(static_cast<unsigned int>(time(NULL)));
    // 生成并输出 10 个随机数
    for (i = 0; i < 10; i++)
    {
        j = rand();
        cout << "随机数: " << j << endl;
    }
    return 0;
}
```
#### <span style="color: rgb(238,130,238);">**输出（示例）：**</span>

```yaml
随机数: 1748144778
随机数: 630873888
随机数: 2134540646
随机数: 219404170
随机数: 902129458
随机数: 920445370
随机数: 1319072661
随机数: 257938873
随机数: 1256201101
随机数: 580322989
```

解释：每次运行时，输出的随机数会有所不同。`srand()` 用当前时间作为种子，确保每次生成的随机数序列不同。

------

### <span style="color: rgb(0,191,255);">**C++ 数学常数**</span>

从 C++20 开始，标准库中提供了几个常见的数学常数，如 π、e 和黄金比例等。它们定义在 `std::numbers` 命名空间下。

#### <span style="color: rgb(32,178,170);">**示例 4：数学常数**</span> 

```cpp
#include <iostream>
#include <cmath>
#include <numbers>
int main()
{
    // 输出数学常数
    std::cout << "pi: " << std::numbers::pi << std::endl;
    std::cout << "e: " << std::numbers::e << std::endl;
    std::cout << "phi: " << std::numbers::phi << std::endl;
    return 0;
}
```
#### <span style="color: rgb(238,130,238);">**输出：**</span>

```yaml
pi: 3.14159
e: 2.71828
phi: 1.61803
```