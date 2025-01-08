---
layout: post
title: "语法&介绍"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-3.png
---
# <span style="color: rgb(255,127,80);">基本语法&介绍</span>

### <span style="color: rgb(0,191,255);">1. **基本结构**</span>

一个简单的 C++ 程序结构如下：

```cpp
#include <iostream>  // 引入标准输入输出库
using namespace std;  // 使用标准命名空间
int main() 
{  // 主函数
    cout << "Hello, World!" << endl;  // 输出内容
    return 0;  // 返回值
}
```

### <span style="color: rgb(0,191,255);">2. **数据类型**</span>

C++ 提供了多种基本数据类型：

- `int`：整数类型
- `float`：单精度浮点数
- `double`：双精度浮点数
- `char`：字符类型
- `bool`：布尔类型（`true` 或 `false`）
- `void`：无类型

### <span style="color: rgb(0,191,255);">3. **变量声明**</span>

变量在使用之前需要声明，可以指定初始值：

```cpp
int a = 10;
float b = 3.14;
char c = 'A';
```

### <span style="color: rgb(0,191,255);">4. **控制结构**</span>

- **条件语句**：

  ```cpp
  if (a > b) 
  {
      cout << "a is greater than b" << endl;
  } 
  else 
  {
      cout << "b is greater than or equal to a" << endl;
  }
  ```

- **循环语句**：

  ```cpp
  // for 循环
  for (int i = 0; i < 5; i++) 
  {
      cout << i << endl;
  }
  // while 循环
  int j = 0;
  while (j < 5) 
  {
      cout << j << endl;
      j++;
  }
  // do-while 循环
  int k = 0;
  do {
      cout << k << endl;
      k++;
  } while (k < 5);
  ```

### <span style="color: rgb(0,191,255);">5. **函数**</span>

函数用于封装代码块，方便复用：

```cpp
int add(int a, int b) 
{
    return a + b;
}
int main() 
{
    int result = add(3, 4);
    cout << "Sum is: " << result << endl;
    return 0;
}
```

### <span style="color: rgb(0,191,255);">6. **数组**</span>

数组用于存储多个相同类型的元素：

```cpp
int arr[5] = {1, 2, 3, 4, 5};
cout << arr[0];  // 输出数组的第一个元素
```

### <span style="color: rgb(0,191,255);">7. **指针**</span>

指针存储变量的内存地址：

```cpp
int a = 10;
int *ptr = &a;  // 指针 ptr 存储 a 的地址
cout << *ptr;  // 解引用，输出 a 的值
```

### <span style="color: rgb(0,191,255);">8. **面向对象**</span>

C++ 支持面向对象编程，基本概念包括类、对象、继承、封装和多态。

- 类和对象：
  ```cpp
  class Car 
  {
  	public:
      string model;
      int year;
      void display() 
      {
          cout << "Model: " << model << ", Year: " << year << endl;
      }
  };
  int main() 
  {
      Car myCar;
      myCar.model = "Toyota";
      myCar.year = 2020;
      myCar.display();  // 输出：Model: Toyota, Year: 2020
      return 0;
  }
  ```

### <span style="color: rgb(0,191,255);">9. **输入输出**</span>

- 标准输入输出：
  ```cpp
  int x;
  cout << "Enter a number: ";
  cin >> x;
  cout << "You entered: " << x << endl;
  ```

### <span style="color: rgb(0,191,255);">10. **常量**</span>

常量是不可改变的变量，使用 `const` 关键字声明：

```cpp
const float PI = 3.14;
```

### <span style="color: rgb(0,191,255);">11. **命名空间**</span>

C++ 使用命名空间来避免名称冲突，常见的是 `std`（标准命名空间）：

```cpp
using namespace std;
```