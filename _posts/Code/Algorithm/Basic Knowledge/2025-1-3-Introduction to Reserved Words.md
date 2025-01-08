---
layout: post
title: "关键字（保留字）介绍"
author: "ZJM"
categories: code/algorithm/basic-knowledge
tags: [Code]
image: code-cover-4.png

---

# <span style="color: rgb(255,127,80);">**关键字（保留字）介绍**</span> 

C++ 中的关键字（也称为保留字）是语言的预定义元素，它们已被编译器和运行环境为特定功能保留。这些关键字不能被用作为变量名或其他自定义元素。下面将全面介绍这些关键字：

| asm         | auto       | bool             | break        |
| ----------- | ---------- | ---------------- | ------------ |
| case        | catch      | char             | class        |
| const       | const_cast | continue         | default      |
| delete      | do         | double           | dynamic_cast |
| else        | enum       | explicit         | export       |
| extern      | false      | float            | for          |
| friend      | goto       | if               | inline       |
| int         | long       | mutable          | namespace    |
| new         | operator   | private          | protected    |
| public      | register   | reinterpret_cast | return       |
| short       | signed     | sizeof           | static       |
| static_cast | struct     | switch           | template     |
| this        | throw      | true             | try          |
| typedef     | typeid     | typename         | union        |
| unsigned    | using      | virtual          | void         |
| volatile    | wchar_t    |                  |              |

---

## <span style="color: rgb(0,191,255);">**详细介绍**</span> 

### <span style="color: rgb(32,178,170);">**1. asm**</span>

允许在 C++ 程序中嵌入汇编代码。例如：

```cpp
asm("movl %0, %%eax" : "=r"(result));
```

### <span style="color: rgb(32,178,170);">**2. auto**</span>

标示自动型别，表示变量自动具有本地范围。例如：

```cpp
auto x = 10; // 自动推断 x 为 int 类型
```

### <span style="color: rgb(32,178,170);">**3. bool**</span>

基础数据类型，值为 `true` 或 `false`，通常用于条件判断。例如：

```cpp
bool isReady = true;
if (isReady) 
{
    // 执行某些操作
}
```

### <span style="color: rgb(32,178,170);">**4. break**</span>

在 `switch` 或循环中使用，用于中断并跳出循环。例如：

```cpp
for (int i = 0; i < 10; i++) 
{
    if (i == 5) break;
}
```

### <span style="color: rgb(32,178,170);">**5. case**</span>

使用于 `switch` 语句，用于判断分支条件。例如：

```cpp
switch (value) 
{
    case 1:
        // 操作
        break;
    default:
        // 默认操作
}
```

### <span style="color: rgb(32,178,170);">**6. catch**</span>

配合 `try` 语句，用于异常处理。例如：

```cpp
try {
    throw 42;
} catch (int e) {
    std::cout << "Caught exception: " << e;
}
```

### <span style="color: rgb(32,178,170);">**7. char**</span>

基础数据类型，表示单个字符，值通常为 0~255。例如：

```cpp
char c = 'A';
```

### <span style="color: rgb(32,178,170);">**8. class**</span>

面向对象编程的基础，用于声明类。例如：

```cpp
class MyClass {
    int value;
public:
    MyClass(int v) : value(v) {}
};
```

### <span style="color: rgb(32,178,170);">**9. const**</span>

保护变量不被修改，可以用于声明常量。例如：

```cpp
const int maxSize = 100;
```

### <span style="color: rgb(32,178,170);">**10. const_cast**</span>

修改型的 `const` 或 `volatile` 属性，用于将常量指针转换为非常量指针。例如：

```cpp
const int a = 10;
int* b = const_cast<int*>(&a);
```

### <span style="color: rgb(32,178,170);">**11. continue**</span>

跳过本次循环的余下部分，并进入下一次循环。例如：

```cpp
for (int i = 0; i < 10; i++) 
{
    if (i % 2 == 0) continue;
    std::cout << i;
}
```

### <span style="color: rgb(32,178,170);">**12. default**</span>

在 `switch` 语句中，用于处理所有不满足条件的情况。例如：

```cpp
switch (value) 
{
    case 1:
        // 操作
        break;
    default:
        // 默认操作
}
```

### <span style="color: rgb(32,178,170);">**13. delete**</span>

释放通过 `new` 实例化的内存。例如：

```cpp
int* p = new int(10);
delete p;
```

### <span style="color: rgb(32,178,170);">**14. do**</span>

配合 `while` 语句，保证至少执行一次循环体。例如：

```cpp
do 
{
    std::cout << "Running";
} while (false);
```

### <span style="color: rgb(32,178,170);">**15. double**</span>

基础数据类型，表示双精度浮点数。例如：

```cpp
double pi = 3.14159;
```

### <span style="color: rgb(32,178,170);">**16. dynamic_cast**</span>

让运行时进行类型转换，通常用于基类和泛生类间的安全转换。例如：

```cpp
Base* base = new Derived();
Derived* derived = dynamic_cast<Derived*>(base);
```

### <span style="color: rgb(32,178,170);">**17. else**</span>

应对于 `if`，对不满足条件的分支执行。例如：

```cpp
if (x > 10) 
{
    std::cout << "Greater";
} 
else 
{
    std::cout << "Smaller or equal";
}
```

### <span style="color: rgb(32,178,170);">**18. enum**</span>

声明枚举类型，实现一组固定值的选择。例如：

```cpp
enum Color { RED, GREEN, BLUE };
Color myColor = RED;
```

### <span style="color: rgb(32,178,170);">**19. explicit**</span>

禁止单参数构造函数自动进行类型转换。例如：

```cpp
class MyClass 
{
    explicit MyClass(int x) {}
};
```

### <span style="color: rgb(32,178,170);">**20. export**</span>

用于模板的跨单元定义。例如：

```cpp
export template<typename T>
void func(T t) {
    // 模板实现
}
```

### <span style="color: rgb(32,178,170);">**21. extern**</span>

声明外部变量或函数，在其他文件中可见。例如：

```cpp
extern int globalVar;
```

### <span style="color: rgb(32,178,170);">**22. false**</span>

基础数据类型 bool 的值之一，等价于整数值 `0`。

```cpp
bool isReady = false;
```

### <span style="color: rgb(32,178,170);">**23. float**</span>

基础数据类型，表示浮点数，精度低于 `double`。

```cpp
float pi = 3.14f;  
```

### <span style="color: rgb(32,178,170);">**24. for**</span>

循环结构之一，用于自动计数循环。

```cpp
for (int i = 0; i < 10; i++) {  
    std::cout << i << " ";  
}  
```

### <span style="color: rgb(32,178,170);">**25. friend**</span>

声明友元关系，允许友元访问类中的私有和受保护成员。

```cpp
class MyClass {  
private:  
    int value;  
public:  
    friend void showValue(MyClass obj);  
};  

void showValue(MyClass obj) 
{  
    std::cout << obj.value;  
}  
```

### <span style="color: rgb(32,178,170);">**26. goto**</span>

实现无条件跳转。

```cpp
int i = 0;  
start:  
std::cout << i << " ";  
i++;  
if (i < 5) goto start;  
```

### <span style="color: rgb(32,178,170);">**27. if**</span>

条件判断语句，根据布尔值决定分支执行。

```cpp
if (x > 10) 
{  
    std::cout << "Greater";  
}  
```

### <span style="color: rgb(32,178,170);">**28. inline**</span>

定义内联函数，提高程序效率。

```cpp
inline int add(int a, int b) 
{  
    return a + b;  
}  
```

### <span style="color: rgb(32,178,170);">**29. int**</span>

基础数据类型，表示整数。

```cpp
int age = 30;  
```

### <span style="color: rgb(32,178,170);">**30. long**</span>

基础数据类型，表示长整型。

```cpp
long distance = 100000L;  
```

### <span style="color: rgb(32,178,170);">**31. mutable**</span>

允许在 `const` 函数中修改成员变量。

```cpp
class MyClass {  
    mutable int count;  
public:  
    void increment() const 
    {  
        count++;  
    }  
};  
```

### <span style="color: rgb(32,178,170);">**32. namespace**</span>

用于逻辑组织代码，避免名称冲突。

```cpp
namespace MyNamespace 
{  
    int value = 10;  
}  
std::cout << MyNamespace::value;  
```

### <span style="color: rgb(32,178,170);">**33. new**</span>

在堆上分配动态内存。

```cpp
int* p = new int(5);  
```

### <span style="color: rgb(32,178,170);">**34. operator**</span>

用于操作符重载。

```cpp
class MyClass {  
public:  
    int value;  
    MyClass(int v) : value(v) {}  
    MyClass operator+(const MyClass& obj) {  
        return MyClass(value + obj.value);  
    }  
};  
```

### <span style="color: rgb(32,178,170);">**35. private**</span>

访问控制符，表示私有成员。

```cpp
class MyClass {  
private:  
    int value;  
};  
```

### <span style="color: rgb(32,178,170);">**36. protected**</span>

访问控制符，表示受保护成员。

```cpp
class Base {  
protected:  
    int value;  
};  
```

### <span style="color: rgb(32,178,170);">**37. public**</span>

访问控制符，表示公共成员。

```cpp
class MyClass {  
public:  
    int value;  
};  
```

### <span style="color: rgb(32,178,170);">**38. register**</span>

提示编译器将变量存储在寄存器中。

```cpp
register int counter = 0;  
```

### <span style="color: rgb(32,178,170);">**39. reinterpret_cast**</span>

进行类型转换，如指针与整数之间转换。

```cpp
int a = 10;  
int* p = reinterpret_cast<int*>(&a);  
```

### <span style="color: rgb(32,178,170);">**40. return**</span>

用于函数中返回值，并结束函数执行。

```cpp
int getValue() 
{  
    return 10;  
}  
```

### <span style="color: rgb(32,178,170);">**41. short**</span>

基础数据类型，表示短整型。

```cpp
short num = 100;  
```

### <span style="color: rgb(32,178,170);">**42. signed**</span>

显式声明有符号数据类型。

```cpp
signed int num = -10;  
```

### <span style="color: rgb(32,178,170);">**43. sizeof**</span>

获取类型或变量占用的内存大小。

```cpp
std::cout << sizeof(int);  
```

### <span style="color: rgb(32,178,170);">**44. static**</span>

用于声明静态变量或静态成员函数。

```cpp
class MyClass {  
    static int count;  
};  
```

### <span style="color: rgb(32,178,170);">**45. static_cast**</span>

进行安全的显式类型转换。

```cpp
float f = 3.14f;  
int i = static_cast<int>(f);  
```

### <span style="color: rgb(32,178,170);">**46. struct**</span>

定义结构体类型。

```cpp
struct Point 
{  
    int x, y;  
};  
```

### <span style="color: rgb(32,178,170);">**47. switch**</span>

用于多分支选择语句。

```cpp
switch (value) 
{  
    case 1:  
        std::cout << "One";  
        break;  
    default:  
        std::cout << "Other";  
}  
```

### <span style="color: rgb(32,178,170);">**48. template**</span>

实现模板编程机制。

```cpp
template <typename T>  
T add(T a, T b) {  
    return a + b;  
}  
```

### <span style="color: rgb(32,178,170);">**49. this**</span>

返回当前对象的指针。

```cpp
class MyClass {  
public:  
    MyClass* getPointer() {  
        return this;  
    }  
};  
```

### <span style="color: rgb(32,178,170);">**50. throw**</span>

用于抛出异常。

```cpp
throw std::runtime_error("Error occurred");  
```

### <span style="color: rgb(32,178,170);">**51. true**</span>

布尔类型值，等价于非零整数值。

```cpp
bool isReady = true;  
```

### <span style="color: rgb(32,178,170);">**52. try**</span>

与 `catch` 搭配实现异常处理。

```cpp
try {  
    throw 42;  
} catch (int e) {  
    std::cout << e;  
}  
```

### <span style="color: rgb(32,178,170);">**53. typedef**</span>

为数据类型定义新名称。

```cpp
typedef unsigned int uint;  
```

### <span style="color: rgb(32,178,170);">**54. typeid**</span>

获取对象的实际类型信息。

```cpp
std::cout << typeid(x).name();  
```

### <span style="color: rgb(32,178,170);">**55. typename**</span>

用于声明模板中嵌套类型。

```cpp
template <typename T>  
typename T::value_type func();  
```

### <span style="color: rgb(32,178,170);">**56. union**</span>

定义联合体，共享内存空间。

```cpp
union Data {  
    int i;  
    float f;  
};  
```

### <span style="color: rgb(32,178,170);">**57. unsigned**</span>

显式声明无符号数据类型。

```cpp
unsigned int num = 10;  
```

### <span style="color: rgb(32,178,170);">**58. using**</span>

声明使用命名空间或定义别名。

```cpp
using namespace std;  
```

### <span style="color: rgb(32,178,170);">**59. virtual**</span>

用于声明虚函数，实现多态。

```cpp
class Base {  
    virtual void func();  
};  
```

### <span style="color: rgb(32,178,170);">**60. void**</span>

表示无返回值或无类型。

```cpp
void func() {}  
```

### <span style="color: rgb(32,178,170);">**61. volatile**</span>

声明变量可能被外部修改。

```cpp
volatile int flag = 1;  
```

### <span style="color: rgb(32,178,170);">**62. wchar_t**</span>

表示宽字符类型。

```cpp
wchar_t ch = L'A';  
```