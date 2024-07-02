# 多线程和并发

多线程和并发编程是现代编程中非常重要的概念，特别是在需要提高程序性能、处理大量任务或保持程序响应性的情况下。

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

::: tip 线程生命周期
线程在其生命周期中可以处于以下几种状态：

- 新建 (NEW)：线程被创建，但尚未启动。
- 运行 (RUNNABLE)：线程正在运行，或者准备好运行。
- 阻塞 (BLOCKED)：线程被阻塞，等待监视器锁定。
- 等待 (WAITING)：线程等待另一个线程执行特定操作。
- 计时等待 (TIMED_WAITING)：线程在指定时间内等待另一个线程执行特定操作。
- 终止 (TERMINATED)：线程已经完成执行。

:::

## 二、并发

并发是指在同一时间段内，系统可以同时执行多个任务。在 Java 中，可以通过 `synchronized` 关键字和 `Lock` 接口来实现对共享资源的访问控制，避免多个线程同时访问共享资源造成的数据竞争和不一致性问题。

```java
// 示例：使用同步方法
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
// 示例：使用 ReentrantLock（锁）
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

## 三、线程池

::: tip 核心参数

- corePoolSize
- maxnumPoolSize
- workQueue
- keepAliveTime
- unit
- threadFactory
- handler

:::

线程池是管理多个线程的机制，避免频繁地创建和销毁线程，从而提高性能和资源利用率。Java 提供了 `ExecutorService` 接口和 `Executors` 工具类来管理线程池。

**示例：使用线程池**

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(10);

        for (int i = 0; i < 100; i++) {
            executor.execute(() -> {
                System.out.println("Task executed by " + Thread.currentThread().getName());
            });
        }

        executor.shutdown();
    }
}
```

### 并发工具类

Java 提供了许多并发工具类来帮助开发者更容易地实现复杂的并发控制。

#### ExecutorService

`ExecutorService` 是一个用于管理线程池的接口，提供了异步执行任务的方法。

**示例：使用 ExecutorService**

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(5);

        for (int i = 0; i < 10; i++) {
            executor.submit(() -> {
                System.out.println("Task executed by " + Thread.currentThread().getName());
            });
        }

        executor.shutdown();
    }
}
```

#### CountDownLatch

`CountDownLatch` 是一个同步辅助类，允许一个或多个线程等待其他线程完成一组操作。

**示例：使用 CountDownLatch**

```java
import java.util.concurrent.CountDownLatch;

public class CountDownLatchExample {
    public static void main(String[] args) throws InterruptedException {
        int threadCount = 3;
        CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 0; i < threadCount; i++) {
            new Thread(() -> {
                System.out.println("Thread " + Thread.currentThread().getName() + " is running");
                latch.countDown();
            }).start();
        }

        latch.await();  // 主线程等待所有工作线程完成
        System.out.println("All threads have finished");
    }
}
```

#### CyclicBarrier

`CyclicBarrier` 是一个同步辅助类，允许一组线程相互等待，直到所有线程都达到某个公共屏障点。

**示例：使用 CyclicBarrier**

```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierExample {
    public static void main(String[] args) {
        int threadCount = 3;
        CyclicBarrier barrier = new CyclicBarrier(threadCount, () -> {
            System.out.println("All threads have reached the barrier");
        });

        for (int i = 0; i < threadCount; i++) {
            new Thread(() -> {
                System.out.println("Thread " + Thread.currentThread().getName() + " is running");
                try {
                    barrier.await();  // 等待其他线程到达屏障
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```
