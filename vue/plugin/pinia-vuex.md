# Pinia 与 VUEX 的对比

## 相同点

- 都是状态管理库
- 都支持模块化
- 都支持 Pinia 的插件
- 都支持 TypeScript
- 都支持热更新

## 不同点

- Pinia 没有命名空间的概念，而 Vuex 有
- Pinia 没有 mutation 的概念，只有 action 的概念，并且 action 支持同步和异步
- Pinia 没有 modules 的概念，而 Vuex 有 modules 的概念
- Pinia 没有 state 的分割，而 Vuex 有 state 的分割

::: tip 不同点（详细解释）

1. **命名空间概念：**

   - **Vuex 有命名空间的概念：** Vuex 支持在模块中使用命名空间，以避免不同模块的命名冲突。
   - **Pinia 没有命名空间的概念：** Pinia 不使用命名空间，而是通过 **<span style="color:#f00">独立的 stores 管理状态</span>**，避免了命名冲突。

2. **mutation 的概念：**

   - **Vuex 有 mutation 的概念：** Vuex 使用 mutations 来进行同步状态变更，确保状态变更的可追踪性。
   - **Pinia 没有 mutation 的概念：** **<span style="color:#f00">Pinia 不使用 mutations</span>**，所有的状态变更都通过 actions 完成，**<span style="color:#f00">actions 可以是同步或异步的</span>**。

3. **modules 的概念：**

   - **Vuex 有 modules 的概念：** Vuex 支持将状态、mutations、actions 和 getters 组织成模块（modules），这些模块可以有命名空间。
   - **Pinia 没有 modules 的概念：** Pinia 通过创建多个独立的 stores 来组织状态管理逻辑，每个 store 独立存在，没有模块的概念。

4. **state 的分割：**
   - **Vuex 有 state 的分割：** Vuex 中的状态可以通过 modules 进行分割，每个 module 管理自己的一部分状态。
   - **Pinia 没有传统意义上的 state 分割：** Pinia 的状态管理是通过独立的 stores 实现的，每个 store 管理自己的状态。

:::

## 一、设计理念和 API 风格

**Vuex:**

- **Options API:** Vuex 的设计和 Vue 2 的 Options API 紧密结合。状态（state）、变更（mutations）、动作（actions）、和获取器（getters）在模块中明确分离。
- **命名空间:** Vuex 支持模块的命名空间，允许模块化状态管理。
- **严格的结构:** Vuex 强调单一状态树和统一的状态变更方式，通过 `mutations` 明确记录每一次状态变更。

**Pinia:**

- **Composition API:** Pinia 基于 Vue 3 的 Composition API 设计，使用更直观和灵活的 API，可以更容易地进行代码复用和组合。
- **模块化:** Pinia 提供模块化的状态管理，每个 store 都是独立的，可以灵活组合。
- **轻量级:** Pinia 的设计更轻量级，减少了许多模板化的配置。

## 二、状态管理方式

**Vuex:**

- **单一状态树:** Vuex 使用单一状态树管理整个应用的状态，所有模块的状态都在一个全局对象中。
- **严格模式:** Vuex 有严格模式，确保状态的修改只能通过 mutations 进行，便于调试和维护。

**Pinia:**

- **独立的 stores:** Pinia 将状态分为多个独立的 stores，每个 store 管理自己的一部分状态，可以根据需要导入和使用。
- **灵活的状态管理:** Pinia 的状态管理更灵活，可以在一个组件中使用多个 stores，或者将 store 的逻辑提取出来进行复用。

## 三、异步处理

**Vuex:**

- **Actions:** 异步操作通过 actions 处理，actions 可以分发（dispatch）其他 actions 或提交（commit）mutations。
- **结构清晰:** actions 和 mutations 分离，actions 处理异步逻辑，mutations 处理同步状态变更。

**Pinia:**

- **直接支持异步:** Pinia 支持在 actions 中直接进行异步操作，不需要像 Vuex 那样区分 actions 和 mutations。
- **简化异步逻辑:** 使用 Composition API 的优势，异步逻辑和同步逻辑可以更自然地组合在一起。

## 四、性能优化

**Vuex:**

- **依赖追踪:** Vuex 通过 Vue 的响应式系统实现依赖追踪，但在大型应用中可能需要手动进行性能优化。

**Pinia:**

- **更细粒度的反应:** Pinia 使用 Vue 3 的 reactivity 系统，可以更细粒度地追踪依赖，提高性能。
- **批量更新:** Pinia 在内部优化了状态更新策略，可以在适当的时候批量更新状态，从而提升性能。

## 五、类型支持

**Vuex:**

- **类型支持较弱:** Vuex 对 TypeScript 的支持有限，虽然可以通过插件和额外配置实现类型检查，但不够直观和方便。

**Pinia:**

- **优秀的 TypeScript 支持:** Pinia 从设计上就考虑了 TypeScript 的使用，提供了更好的类型推断和类型安全。

## 六、生态系统

**Vuex:**

- **成熟的生态系统:** Vuex 拥有一个成熟且广泛使用的生态系统，有丰富的插件和社区支持，可以轻松找到解决方案和最佳实践。

**Pinia:**

- **新兴的生态系统:** Pinia 是 Vue 3 的新兴状态管理库，生态系统还在发展中，但正在快速增长，社区支持也在逐渐增加。

## 总结

- **Vuex:** 适合那些希望保持结构化和一致性的项目，特别是使用 Vue 2 或希望利用 Vuex 成熟生态系统的项目。Vuex 强调明确的状态变更方式和单一状态树，适合需要严格管理状态的场景。
- **Pinia:** 适合使用 Vue 3 和 Composition API 的项目，尤其是希望利用现代 JavaScript 特性和更好类型支持的项目。Pinia 提供了更灵活和轻量级的状态管理方式，简化了状态和逻辑的复用和组合。
