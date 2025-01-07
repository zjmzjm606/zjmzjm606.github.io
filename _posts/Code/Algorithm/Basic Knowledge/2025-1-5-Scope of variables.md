---
layout: post
title: "变量的作用域"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-5.png

---

在 C++ 中，变量的作用域指的是变量可以被访问的范围。通常来说，变量的作用域可以分为以下几种类型：

- **局部作用域**：变量仅在函数或代码块内部可访问。
- **全局作用域**：变量在整个程序中都可访问。
- **块作用域**：变量仅在某个特定代码块（如 if 语句、循环等）内可访问。
- **类作用域**：变量仅在类内部可访问。

####  <span style="color: rgb(0,191,255);">**1. 变量声明位置**</span>

变量可以在不同的地方声明，具体包括：

- **局部变量**：在函数或代码块内部声明的变量。
- **形式参数**：在函数参数列表中声明的变量。
- **全局变量**：在所有函数外部声明的变量。

####  <span style="color: rgb(0,191,255);">**2. 作用域详细介绍**</span>

##### <span style="color: rgb(32,178,170);">**2.1 局部作用域**</span> 

局部变量是在函数或代码块内部声明的，它们只在当前函数或代码块中有效。当函数被调用时，局部变量会被创建，函数执行结束后，它们会被销毁。

<span style="color: rgb(238,130,238);">**示例代码：**</span>

```cpp
#include <iostream>
using namespace std;
int main() 
{
    // 局部变量声明
    int a, b;
    int c;

    // 实际初始化
    a = 10;
    b = 20;
    c = a + b;

    cout << c;

    return 0;
}
```

在这个例子中，变量 `a`、`b` 和 `c` 是局部变量，只能在 `main` 函数内部访问。

##### <span style="color: rgb(32,178,170);">**2.2 全局作用域**</span> 

全局变量是在所有函数外部定义的变量，它们在整个程序中都有效，并且可以被任何函数访问。全局变量的生命周期从程序开始到程序结束。

<span style="color: rgb(238,130,238);">**示例代码：**</span>

```cpp
#include <iostream>
using namespace std;
// 全局变量声明
int g;
int main() 
{
    // 局部变量声明
    int a, b;

    // 实际初始化
    a = 10;
    b = 20;
    g = a + b;

    cout << g;

    return 0;
}
```

在这个例子中，`g` 是一个全局变量，可以在整个程序中访问。

##### <span style="color: rgb(32,178,170);">**2.3 局部变量与全局变量同名**</span> 

如果局部变量和全局变量同名，局部变量会覆盖全局变量。也就是说，函数内部会优先使用局部变量。

<span style="color: rgb(238,130,238);">**示例代码：**</span>

```cpp
#include <iostream>
using namespace std;
// 全局变量声明
int g = 20;
int main() 
{
    // 局部变量声明
    int g = 10;
    cout << g;
    return 0;
}
```

输出结果为：

```yaml
10
```

这是因为在 `main` 函数中声明的局部变量 `g` 覆盖了全局变量 `g`。

##### <span style="color: rgb(32,178,170);">**2.4 初始化局部变量和全局变量**</span> 

- **局部变量**：在定义时，系统不会自动为其初始化，必须显式地初始化。
- **全局变量**：系统会自动初始化为默认值。不同数据类型的默认值如下：

| 数据类型  | 初始化默认值 |
| --------- | ------------ |
| `int`     | `0`          |
| `char`    | `'\0'`       |
| `float`   | `0`          |
| `double`  | `0`          |
| `pointer` | `NULL`       |

##### <span style="color: rgb(32,178,170);">**2.5 块作用域**</span> 

块作用域是指在代码块（如条件语句、循环语句等）内部声明的变量。它们仅在该代码块内部有效。

<span style="color: rgb(238,130,238);">**示例代码：**</span>

```cpp
#include <iostream>
using namespace std;
int main()
{
    int a = 10;
    {
        int a = 20;  // 块作用域变量
        cout << "块变量: " << a << std::endl;
    }
    cout << "外部变量: " << a << std::endl;
    return 0;
}
```

输出结果为：

```yaml
块变量: 20
外部变量: 10
```

在这个例子中，内部代码块中声明了一个与外部同名的变量 `a`，并且它覆盖了外部作用域中的变量。在代码块内部访问 `a` 时，输出的是 `20`，而在外部访问时，输出的是 `10`。

##### <span style="color: rgb(32,178,170);">**2.6 类作用域**</span> 

类作用域是指在类内部声明的变量。类的成员变量（或类的静态变量）可以在类的所有成员函数中访问。

<span style="color: rgb(238,130,238);">**示例代码：**</span>

```cpp
#include <iostream>
using namespace std;
class MyClass {
public:
    static int class_var;  // 类作用域变量
};
int MyClass::class_var = 30;
int main() 
{
    cout << "类变量: " << MyClass::class_var << std::endl;
    return 0;
}
```

输出结果为：

```yaml
类变量: 30
```

在这个例子中，`MyClass` 类中声明了一个静态成员变量 `class_var`，它属于类作用域，可以通过类名访问。

####  <span style="color: rgb(0,191,255);">**总结**</span>

- <span style="color: rgb(238,130,238);">**局部作用域**：在函数或代码块内有效。</span>

- <span style="color: rgb(238,130,238);">**全局作用域**：在程序的任何地方有效。</span>

- <span style="color: rgb(238,130,238);">**块作用域**：在代码块内部有效。</span>

- <span style="color: rgb(238,130,238);">**类作用域**：在类内部有效。</span>


理解这些作用域有助于更好地管理变量的生命周期和访问权限。
