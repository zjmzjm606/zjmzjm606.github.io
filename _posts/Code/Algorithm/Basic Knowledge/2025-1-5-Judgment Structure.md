---
layout: post
title: "判断结构"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-8.png
---

# <span style="color: rgb(255,127,80);">**判断结构**</span>

在 C++ 中，判断结构用于评估一个或多个条件，并根据条件的结果来决定执行哪些语句。常见的判断结构有多种形式，每种形式适用于不同的情况。以下是 C++ 中常见的判断结构以及示例：

### <span style="color: rgb(0,191,255);">**1. `if` 语句**</span>

`if` 语句用于判断一个条件是否为真。如果条件为真，执行相应的代码块。

#### <span style="color: rgb(238,130,238);">**语法：**</span>

```cpp
if (condition)
{
    // 如果 condition 为真，执行此语句块
}
```

#### <span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
int age = 20;
if (age >= 18)
{
    cout << "你已经成年了。" << endl;
}
```

在这个例子中，`if` 语句判断变量 `age` 是否大于或等于 18。如果条件成立（`age` >= 18），则输出 `"你已经成年了。"`。

### <span style="color: rgb(0,191,255);">**2. `if...else` 语句**</span>

`if...else` 语句在 `if` 条件为假时，执行 `else` 后面的代码块。

#### <span style="color: rgb(238,130,238);">**语法：**</span>

```cpp
if (condition) 
{
    // 如果 condition 为真，执行此语句块
} 
else
{
    // 如果 condition 为假，执行此语句块
}
```

#### <span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
int age = 16;
if (age >= 18) 
{
    cout << "你已经成年了。" << endl;
} 
else 
{
    cout << "你还未成年。" << endl;
}
```

在这个例子中，如果 `age` 大于或等于 18，则输出 `"你已经成年了。"`；否则，输出 `"你还未成年。" `。

### <span style="color: rgb(0,191,255);">**3. 嵌套 `if` 语句**</span>

可以在 `if` 或 `else` 语句内嵌套其他的 `if` 或 `else` 语句，以处理更复杂的条件判断。

#### <span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
int age = 25;
if (age >= 18)
{
    if (age >= 21)
    {
        cout << "你已经成年且可以合法饮酒。" << endl;
    }
    else
    {
        cout << "你已经成年，但不能合法饮酒。" << endl;
    }
}
else
{
    cout << "你还未成年。" << endl;
}
```

这里，首先判断是否成年，然后在成年基础上判断是否可以合法饮酒。

### <span style="color: rgb(0,191,255);">**4. `switch` 语句**</span>

`switch` 语句用于测试一个变量是否等于多个值中的某一个。它适用于多个条件的判断。

#### <span style="color: rgb(238,130,238);">**语法：**</span>

```cpp
switch (variable)
{
    case value1:
        // 如果 variable == value1，执行此语句块
        break;
    case value2:
        // 如果 variable == value2，执行此语句块
        break;
    default:
        // 如果 variable 不等于任何 case，执行此语句块
        break;
}
```

#### <span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
int day = 3;
switch (day)
{
    case 1:
        cout << "今天是星期一。" << endl;
        break;
    case 2:
        cout << "今天是星期二。" << endl;
        break;
    case 3:
        cout << "今天是星期三。" << endl;
        break;
    default:
        cout << "输入无效。" << endl;
}
```
在这个例子中，`switch` 语句根据变量 `day` 的值选择匹配的 `case`，并执行相应的代码块。

### <span style="color: rgb(0,191,255);">**5. 嵌套 `switch` 语句**</span>

`switch` 语句也可以嵌套，即在一个 `case` 或 `default` 分支内使用另一个 `switch` 语句。

#### <span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
int choice = 1;
int subChoice = 2;
switch (choice)
{
    case 1:
        switch (subChoice)
        {
            case 1:
                cout << "选择了选项1的子选项1。" << endl;
                break;
            case 2:
                cout << "选择了选项1的子选项2。" << endl;
                break;
        }
        break;
    case 2:
        cout << "选择了选项2。" << endl;
        break;
    default:
        cout << "无效选择。" << endl;
}
```

这个例子展示了在 `switch` 语句中的 `case` 选项内嵌套另一个 `switch` 语句。

### <span style="color: rgb(0,191,255);">**6. 条件运算符 `? :`**</span>

条件运算符 `? :`，又称三目运算符，是一种简洁的方式来替代 `if...else` 语句。它的形式如下：

```cpp
condition ? expression1 : expression2;
```

如果 `condition` 为真，则计算并返回 `expression1`，否则计算并返回 `expression2`。

#### <span style="color: rgb(238,130,238);">**示例：**</span>

```cpp
int age = 18;
string result = (age >= 18) ? "你已经成年了。" : "你还未成年。";
cout << result << endl;
```

在这个例子中，三目运算符判断 `age` 是否大于或等于 18。如果条件成立，返回 `"你已经成年了。"`，否则返回 `"你还未成年。" `。