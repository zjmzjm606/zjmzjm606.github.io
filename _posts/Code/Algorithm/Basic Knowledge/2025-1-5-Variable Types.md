---
layout: post
title: "基本数据类型"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-3.png
---

# <span style="color: rgb(255,127,80);">**基本数据类型**</span> 

在 C++ 中，**变量**是程序中用于存储数据的命名存储区。每个变量都有一个指定的类型，类型决定了变量所占用的内存大小、数据布局及可以存储的数据值范围。

变量的名称由字母、数字和下划线组成，但必须以字母或下划线开头。需要注意的是，C++ 区分大小写，即大写字母和小写字母被视为不同的字符。

---

在 C++ 中，基本数据类型主要有以下几种：

### <span style="color: rgb(0,191,255);">**1. 基本数据类型**</span> 

| 类型      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| `bool`    | 布尔类型，存储值 `true` 或 `false`，占用 1 个字节。          |
| `char`    | 字符类型，用于存储 ASCII 字符，通常占用 1 个字节。           |
| `int`     | 整数类型，通常用于存储普通整数，通常占用 4 个字节。          |
| `float`   | 单精度浮点数类型，通常占用 4 个字节，存储 1 位符号、8 位指数和 23 位小数。 |
| `double`  | 双精度浮点数类型，通常占用 8 个字节，存储 1 位符号、11 位指数和 52 位小数。 |
| `void`    | 无类型，表示函数不返回值或指针没有类型。                     |
| `wchar_t` | 宽字符类型，存储更大范围的字符，通常占用 2 或 4 个字节。     |

##### <span style="color: rgb(32,178,170);">**基本数据类型示例**</span> 

```cpp
#include <iostream>
using namespace std;
int main() 
{
    bool flag = true;        // 布尔类型
    char letter = 'A';       // 字符类型
    int age = 25;            // 整数类型
    float pi = 3.14f;        // 单精度浮点数
    double piApprox = 3.14159; // 双精度浮点数
    cout << "Flag: " << flag << endl;
    cout << "Letter: " << letter << endl;
    cout << "Age: " << age << endl;
    cout << "Pi: " << pi << endl;
    cout << "Pi Approx: " << piApprox << endl;
    return 0;
}
```

输出：
```yaml
复制代码
Flag: 1
Letter: A
Age: 25
Pi: 3.14
Pi Approx: 3.14159
```

### <span style="color: rgb(0,191,255);">**2. 整数类型**</span>

- `int`: 用于表示普通整数，通常占用 4 个字节。
- `short`: 短整数，通常占用 2 个字节。
- `long`: 长整数，通常占用 4 个字节。
- `long long`: 更长的整数，通常占用 8 个字节。

##### <span style="color: rgb(32,178,170);">**整数类型示例**</span> 

```cpp
#include <iostream>
using namespace std;
int main() 
{
    short s = 32767;        // 短整数类型，最大值
    int i = 100000;         // 普通整数类型
    long l = 1000000000;    // 长整数类型
    long long ll = 1000000000000; // 超长整数类型
    cout << "Short: " << s << endl;
    cout << "Int: " << i << endl;
    cout << "Long: " << l << endl;
    cout << "Long Long: " << ll << endl;
    return 0;
}
```

输出：

```yaml
Short: 32767
Int: 100000
Long: 1000000000
Long Long: 1000000000000
```

### <span style="color: rgb(0,191,255);">**3. 浮点类型**</span> 

- `float`: 单精度浮点数，通常占用 4 个字节。
- `double`: 双精度浮点数，通常占用 8 个字节。
- `long double`: 高精度浮点数，占用字节数根据系统不同而变化。

##### <span style="color: rgb(32,178,170);">**浮点类型示例**</span>  

```cpp
#include <iostream>
using namespace std;
int main() 
{
    float piFloat = 3.14159f;  // 单精度浮点数
    double piDouble = 3.1415926535; // 双精度浮点数
    long double piLongDouble = 3.14159265358979323846; // 高精度浮点数
    cout << "Float Pi: " << piFloat << endl;
    cout << "Double Pi: " << piDouble << endl;
    cout << "Long Double Pi: " << piLongDouble << endl;
    return 0;
}
```

输出：

```yaml
Float Pi: 3.14159
Double Pi: 3.14159
Long Double Pi: 3.14159
```

### <span style="color: rgb(0,191,255);">**4. 字符类型**</span>

- `char`: 单字节字符，通常占用 1 个字节。
- `wchar_t`: 宽字符，通常占用 2 或 4 个字节。
- `char16_t`: 16 位 Unicode 字符，占用 2 个字节。
- `char32_t`: 32 位 Unicode 字符，占用 4 个字节。

##### <span style="color: rgb(32,178,170);">**字符类型示例**</span>

```cpp
#include <iostream>
using namespace std;
int main()
{
    char c = 'A';             // 字符类型
    wchar_t wc = L'你';        // 宽字符类型
    char16_t c16 = u'你';      // 16位 Unicode 字符
    char32_t c32 = U'你';      // 32位 Unicode 字符
    cout << "Char: " << c << endl;
    cout << "Wide Char: " << wc << endl;
    cout << "Char16_t: " << c16 << endl;
    cout << "Char32_t: " << c32 << endl;
    return 0;
}
```

输出：

```yaml
Char: A
Wide Char: 你
Char16_t: 你
Char32_t: 你
```

------

### 变量定义与声明

#### 1. 变量定义

在 C++ 中，**定义变量**时指定其类型，并为该类型创建存储空间。例如：

```cpp
type variable_list;
```

其中 `type` 是有效的 C++ 数据类型，`variable_list` 是一个或多个变量名（以逗号分隔）。例如：

```cpp
int i, j, k;
char c, ch;
float f, salary;
double d;
```

#### 示例：变量定义

```cpp
#include <iostream>
using namespace std;
int main()
{
    int i = 10, j = 20, k;  // 定义并初始化 i 和 j
    char c = 'A';            // 定义字符类型变量 c
    float f = 3.14f;         // 定义浮点数变量 f
    double d = 3.14159;      // 定义双精度浮点数变量 d
    k = i + j;               // 使用变量 i 和 j 计算 k
    cout << "i: " << i << ", j: " << j << ", k: " << k << endl;
    cout << "c: " << c << ", f: " << f << ", d: " << d << endl;
    return 0;
}
```

输出：

```yaml
i: 10, j: 20, k: 30
c: A, f: 3.14, d: 3.14159
```

#### 2. 变量声明

**变量声明**是向编译器保证某个变量在某处存在。声明不需要提供完整的变量定义，仅需指定类型和名称即可。例如：

```cpp
extern int a, b;  // 声明变量 a 和 b
extern float f;   // 声明变量 f
```

`extern` 关键字用于声明变量，表明该变量在其他地方定义。例如，在多个文件中，你可以在头文件声明变量，在源文件中进行定义。

#### 示例：变量声明与定义

```cpp
#include <iostream>
using namespace std;
extern int a, b;  // 声明变量 a 和 b
extern float f;   // 声明变量 f
int main()
{
    int a = 10, b = 20;    // 定义变量 a 和 b
    float f = 70.0 / 3.0;  // 定义并初始化变量 f
    cout << "Sum of a and b: " << a + b << endl;
    cout << "f: " << f << endl;
    return 0;
}
```
输出：

```yaml
Sum of a and b: 30
f: 23.3333
```

------

### 左值（Lvalues）与右值（Rvalues）

C++ 中的表达式分为两种类型：

- **左值（lvalue）**：表示一个内存位置，可以对其进行赋值。左值可以出现在赋值语句的左侧。
- **右值（rvalue）**：表示某个具体的值，不能进行赋值。右值通常出现在赋值语句的右侧，但不能出现在左侧。

#### 示例：左值与右值

```cpp
#include <iostream>
using namespace std;
int main()
{
    int x = 10;  // 变量 x 是左值
    int y = 20;  // 变量 y 是左值
    x = y;  // 这是有效的，左值可以赋值
    // 10 = x; // 错误，10 是右值，不能在赋值语句的左侧
    cout << "x: " << x << ", y: " << y << endl;
    return 0;
}
```
输出：

```yaml
x: 20, y: 20
```