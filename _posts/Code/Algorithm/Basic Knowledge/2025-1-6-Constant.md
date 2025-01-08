---
layout: post
title: "常量"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-10.png
---
# <span style="color: rgb(255,127,80);">**常量**</span>

常量是指在程序执行期间固定不变的值。常量也称为字面量，其值在定义后不能修改。常量可以是任何基本数据类型，如整数、浮点数、字符、字符串和布尔值。常量与变量类似，只是其值在定义后不可改变。

在定义常量时，建议使用大写字母形式。这是一种良好的编程习惯，便于与普通变量区分开来。

---

### <span style="color: rgb(0,191,255);">**1.整数常量**</span>

整数常量有多种表示方式，可以是十进制、八进制或十六进制。基数通过前缀指定：
- `0x` 或 `0X` 表示十六进制。
- `0` 表示八进制。
- 不带前缀表示十进制。

整数常量还可以带有后缀，指定其类型：
- `u` 或 `U` 表示无符号整数（unsigned）。
- `l` 或 `L` 表示长整数（long）。

后缀的顺序和大小写不敏感。

#### <span style="color: rgb(238,130,238);">**合法示例：**</span>
```cpp
212        // 十进制
215u       // 无符号整数
0xFeeL     // 十六进制，长整数
```

#### <span style="color: rgb(238,130,238);">**非法示例：**</span>
```cpp
078        // 非法：8 不是八进制的数字
032UU      // 非法：不能重复后缀
```

#### <span style="color: rgb(238,130,238);">**各种类型的整数常量示例：**</span>
```cpp
85          // 十进制
0213        // 八进制
0x4b        // 十六进制
30          // 整数
30u         // 无符号整数
30l         // 长整数
30ul        // 无符号长整数
```

### <span style="color: rgb(0,191,255);">**2.浮点常量**</span>

浮点常量由整数部分、小数点、小数部分和指数部分组成。可以使用小数形式或指数形式表示。

- 小数形式：必须包含整数部分、小数部分或两者。
- 指数形式：必须包含小数点和指数部分，或同时包含两者，指数使用 `e` 或 `E` 引入。

#### <span style="color: rgb(238,130,238);">**合法示例：**</span>
```cpp
3.14159       // 小数形式
314159E-5L     // 指数形式，长浮点数
```

#### <span style="color: rgb(238,130,238);">**非法示例：**</span>
```cpp
510E          // 非法：不完整的指数
210f          // 非法：缺少小数或指数
.e55          // 非法：缺少整数或分数
```

### <span style="color: rgb(0,191,255);">**3.布尔常量**</span>

布尔常量有两个值，分别是 `true` 和 `false`，它们表示真和假。在 C++ 中，不应将 `true` 视为 1，`false` 视为 0。

### <span style="color: rgb(0,191,255);">**4.字符常量**</span>

字符常量用单引号 `'` 括起来。如果常量前有 `L`（仅当大写时），则表示宽字符常量（例如 `L'x'`）。否则，它是窄字符常量（例如 `'x'`）。

字符常量可以是普通字符、转义序列或通用字符。常见的转义序列如下：

| 转义序列 | 含义      |
|----------|-----------|
| `\\`     | 反斜杠字符 |
| `\'`     | 单引号字符 |
| `\"`     | 双引号字符 |
| `\?`     | 问号字符   |
| `\a`     | 警报铃声   |
| `\b`     | 退格键     |
| `\f`     | 换页符     |
| `\n`     | 换行符     |
| `\r`     | 回车       |
| `\t`     | 水平制表符 |
| `\v`     | 垂直制表符 |
| `\ooo`   | 八进制数   |
| `\xhh...`| 十六进制数 |

#### <span style="color: rgb(238,130,238);">**示例：**</span>
```cpp
#include <iostream>
using namespace std;
int main()
{
    cout << "Hello\tWorld\n\n";
    return 0;
}
```

#### <span style="color: rgb(238,130,238);">**输出：**</span>

```yaml
Hello   World
```

### <span style="color: rgb(0,191,255);">**5.字符串常量**</span>

字符串字面量由双引号 `""` 括起来，包含普通字符、转义序列和通用字符。可以使用 `\` 将长字符串拆分为多行。

#### <span style="color: rgb(238,130,238);">**示例：**</span>
```cpp
#include <iostream>
#include <string>
using namespace std;
int main()
{
    string greeting = "hello, runoob";
    cout << greeting;
    cout << "\n";  // 换行符
    string greeting2 = "hello, \
                        runoob";
    cout << greeting2;
    return 0;
}
```

#### <span style="color: rgb(238,130,238);">**输出：**</span>
```yaml
hello, runoob
hello, runoob
```

---

### <span style="color: rgb(32,178,170);">**定义常量**</span> 

在 C++ 中，有两种常见的定义常量的方式：

1. **使用 `#define` 预处理器**
2. **使用 `const` 关键字**

#### <span style="color: rgb(0,191,255);">**1.使用 `#define` 预处理器：**</span>
```cpp
#define identifier value
```

#### <span style="color: rgb(238,130,238);">**示例：**</span>
```cpp
#include <iostream>
using namespace std;
#define LENGTH 10
#define WIDTH 5
#define NEWLINE '\n'
int main()
{
    int area = LENGTH * WIDTH;
    cout << area;
    cout << NEWLINE;
    return 0;
}
```

#### <span style="color: rgb(238,130,238);">**输出：**</span>
```yaml
50
```

#### <span style="color: rgb(0,191,255);">**2.使用 `const` 关键字：**</span>
```cpp
const type variable = value;
```

#### <span style="color: rgb(238,130,238);">**示例：**</span>
```cpp
#include <iostream>
using namespace std;
int main()
{
    const int LENGTH = 10;
    const int WIDTH = 5;
    const char NEWLINE = '\n';
    int area = LENGTH * WIDTH;
    cout << area;
    cout << NEWLINE;
    return 0;
}
```

#### <span style="color: rgb(238,130,238);">**输出：**</span>
```yaml
50
```
