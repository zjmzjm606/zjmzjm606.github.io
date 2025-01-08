---
layout: post
title: "注释"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-1.png
---
# <span style="color: rgb(255,127,80);">**注释**</span>
程序中的注释是用于解释代码的语句，可以帮助提高源代码的可读性。所有编程语言都支持某种形式的注释，以便开发者更容易理解代码的意图和功能。

C++ 支持两种类型的注释：单行注释和多行注释。在 C++ 中，注释中的内容会被编译器忽略，不会对程序的执行产生任何影响。

---

### <span style="color: rgb(0,191,255);">**C++ 注释的两种形式：**</span>

- **单行注释**： 使用 `//` 开始，注释从 `//` 后开始直到行末。例如：

  ```cpp
  // 这是一个单行注释
  cout << "Hello World!";
  ```

- **多行注释**： 使用 `/*` 开始，以 `*/` 结束，可以注释多行文本。例如：

  ```cpp
  /* 这是一个多行注释
     可以跨越多行
  */
  cout << "Hello World!";
  ```
  
### <span style="color: rgb(0,191,255);">**示例代码**</span>
- **单行注释**
```cpp
#include <iostream>
using namespace std;
int main() 
{
    // 这是一个单行注释
    cout << "Hello World!";  // 语句后面的注释
    return 0;
}
```

在上面的代码中，编译器会忽略 // 这是一个注释 和 // 语句后面的注释，输出结果为：
```yaml
Hello World!
```
- **多行注释**
```cpp
#include <iostream>
using namespace std;
int main() 
{
    /* 这是一个多行注释
       可以跨越多行 */
    cout << "Hello World!";
    return 0;
}
```

在这段代码中，/* 这是一个多行注释 */ 会被编译器忽略，输出结果为：
```yaml
Hello World!
```

### <span style="color: rgb(0,191,255);">**注释嵌套**</span>

虽然注释可以嵌套使用，但有一些注意事项：

<span style="color: rgb(238,130,238);">**在 /* 和 */ 注释内，// 字符没有特殊的含义。**</span>

<span style="color: rgb(238,130,238);">**在 // 注释内，/* 和 */ 字符也没有特殊的含义。**</span>

因此，您可以在一种注释类型内使用另一种注释类型。例如：
```cpp
/* 用于输出 Hello World 的注释

cout << "Hello World"; // 输出 Hello World

*/
```
这种嵌套的注释方式是允许的。