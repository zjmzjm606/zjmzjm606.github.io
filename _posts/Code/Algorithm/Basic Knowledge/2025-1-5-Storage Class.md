---
layout: post
title: "存储类"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-8.png
---

# <span style="color: rgb(255,127,80);">**存储类**</span>

C++ 存储类定义了变量和函数的**作用域**（可见性）和**生命周期**。这些存储类说明符位于变量或函数类型之前。以下是 C++ 中常用的存储类：

## 1. `auto` 存储类

- **定义**：`auto` 是默认存储类，通常可以省略不写。

- **特点**：`auto` 指定的变量具有自动存储期，即变量的生命周期仅限于定义它的块（block）。`auto` 变量通常分配在栈上。

  从 C++11 起，`auto` 用于根据初始化表达式推断变量类型：

  ```cpp
  auto f = 3.14;     // double
  auto s = "hello";  // const char*
  ```

  从 C++17 起，`auto` 不再是存储类说明符。

## 2. `register` 存储类

- **定义**：用于建议编译器将变量存储在 CPU 寄存器中，以提高访问速度。

- **特点**：虽然可以提高访问速度，但它是一个建议，编译器可以忽略此声明。在 C++11 后，`register` 已被弃用。

  语法：

  ```cpp
  register int i;
  ```

## 3. `static` 存储类

- **定义**：用于定义具有静态存储期的变量或函数，生命周期贯穿整个程序的运行期。

- **特点**：在函数内部，`static` 变量的值在函数调用之间保持不变。对于全局作用域，`static` 使变量具有内部链接，仅在定义它的文件中可见。

  示例：

  ```cpp
  static int staticVar = 20; // 函数调用之间保持不变
  ```

  `static` 还可用于类成员，使其共享同一副本。

## 4. `extern` 存储类

- **定义**：用于声明一个具有外部链接的变量或函数，允许多个文件之间共享。

- **特点**：`extern` 使得一个全局变量或函数在其他文件中可见。

  示例：

  **main.cpp**:

  ```cpp
  extern int count;
  ```

  **support.cpp**:

  ```cpp
  extern int count;  // 引用 main.cpp 中的 count
  ```

## 5. `mutable` 存储类 (C++11)

- **定义**：用于修饰类中的成员变量，使它们可以在 `const` 成员函数中修改。

- **特点**：通常用于需要在 `const` 环境下修改状态的变量，如缓存或计数器。

  示例：

  ```cpp
  class MyClass {
  public:
      mutable int mutableVar;
  
      void constMemberFunc() const {
          mutableVar = 50; // 允许修改 mutable 成员变量
      }
  };
  ```

## 6. `thread_local` 存储类 (C++11)

- **定义**：用于在多线程环境中定义线程局部存储期的变量。

- **特点**：每个线程拥有该变量的独立副本，线程结束时自动销毁。

  示例：

  ```cpp
  thread_local int threadVar = 60; // 每个线程有自己的独立副本
  ```

## 存储类的总结

- `auto` 和 `static` 是最常用的存储类，分别用于自动推断类型和保证变量生命周期。
- `register` 是一个优化提示，已在 C++11 中废弃。
- `extern` 用于跨文件共享变量或函数。
- `mutable` 和 `thread_local` 引入于 C++11，分别用于在 `const` 函数内修改变量和管理线程特有变量。

## 示例代码：展示不同存储类

```cpp
#include <iostream>

int globalVar;  // 全局变量，extern 默认为外部链接

void function() {
    auto int localVar = 10;  // 局部变量，自动存储期
    static int staticVar = 20;  // 静态变量，生命周期贯穿整个程序

    // const 变量默认为 static 存储期
    const int constVar = 30;
    
    // mutable 成员变量，可以在 const 函数中修改
    class MyClass {
    public:
        mutable int mutableVar;
  
        void constMemberFunc() const {
            mutableVar = 50; // 修改 mutable 成员变量
        }
    };
  
    thread_local int threadVar = 60;  // 线程局部变量
}

int main() {
    extern int externalVar;  // 声明外部变量
    function();
    return 0;
}
```

## 存储类的详细说明

### 1. `auto` 存储类

自 C++11 起，`auto` 用于两种场景：

- 根据初始化表达式自动推断变量类型：

  ```cpp
  auto f = 3.14;  // double
  auto s = "hello";  // const char*
  ```

### 2. `register` 存储类

`register` 用于将变量存储在寄存器中以提高访问速度，尤其是循环变量：

```cpp
register int i;
for (i = 0; i < 1000; ++i) {
    // 循环体
}
```

### 3. `static` 存储类

`static` 用于指示变量在程序运行期间持续存在，常用于局部静态变量和全局变量的作用域限制。

#### 局部静态变量：

```cpp
void func() {
    static int i = 5;  // 局部静态变量
    i++;
    std::cout << "i = " << i << std::endl;
}
```

### 4. `extern` 存储类

`extern` 用于引用其他文件中的全局变量或函数。

#### 示例：跨文件使用 `extern`

**main.cpp**:

```cpp
extern int count;
void write_extern();

int main() {
    count = 5;
    write_extern();
}
```

**support.cpp**:

```cpp
extern int count;  // 引用 main.cpp 中的 count

void write_extern() {
    std::cout << "Count is " << count << std::endl;
}
```

### 5. `mutable` 存储类

`mutable` 使得类的成员可以在 `const` 成员函数中修改。

```cpp
class Example {
public:
    mutable int cachedValue;  // 可以在 const 函数中修改

    int getValue() const {
        return cachedValue;
    }

    void increment() {
        cachedValue++;
    }
};
```

### 6. `thread_local` 存储类

`thread_local` 定义线程局部存储变量，每个线程都有自己独立的副本。

```cpp
thread_local int threadSpecificVar = 0;

void threadFunction(int id) {
    threadSpecificVar = id;
    std::cout << "Thread " << id << ": threadSpecificVar = " << threadSpecificVar << std::endl;
}

int main() {
    std::thread t1(threadFunction, 1);
    std::thread t2(threadFunction, 2);

    t1.join();
    t2.join();

    return 0;
}
```

------

通过合理使用存储类说明符，可以提升程序的可维护性和性能，帮助管理变量的生命周期、可见性和存储位置。
