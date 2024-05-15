# 多线程和并发

::: tip 线程的五个基本状态

- 可运行
- 运行
- 等待锁
- 等待队列（已释放锁，等待被唤醒，唤醒后进入“等待锁”状态）
- 其他等待状态（释放处理器，不释放锁，结束之后进入可运行态）

:::

::: tip 创建线程的方式

- thread
- runnable
- callable
- 线程池

:::

## 一、多线程

多线程是指一个程序中包含多个线程，每个线程可以独立执行不同的任务。在 Java 中，可以通过继承 `Thread` 类或实现 `Runnable` 接口来创建线程。例如：

```java
class MyThread extends Thread {
    public void run() {
        // 线程要执行的任务
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        MyThread thread2 = new MyThread();
        thread1.start();
        thread2.start();
    }
}
```

或者使用 `Runnable` 接口：

```java
class MyRunnable implements Runnable {
    public void run() {
        // 线程要执行的任务
    }
}

public class Main {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread1 = new Thread(myRunnable);
        Thread thread2 = new Thread(myRunnable);
        thread1.start();
        thread2.start();
    }
}
```

## 二、线程池

::: tip 核心参数

- corePoolSize
- maxnumPoolSize
- workQueue
- keepAliveTime
- unit
- threadFactory
- handler

:::

## 三、并发

并发是指在同一时间段内，系统可以同时执行多个任务。在 Java 中，可以通过 `synchronized` 关键字和 `Lock` 接口来实现对共享资源的访问控制，避免多个线程同时访问共享资源造成的数据竞争和不一致性问题。

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}
```

除了使用 `synchronized` 关键字外，还可以使用 `Lock` 接口来实现锁定：

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class Counter {
    private int count = 0;
    private Lock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }

    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}
```
