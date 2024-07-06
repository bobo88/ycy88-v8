# 大五人格测试题目

<!-- https://ycy88.com/java/apis/random-questions?numberOfQuestions=40 -->
<!-- https://www.xmcs.cn/ -->

## 一、表名：`personality_questions`

### 字段

- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)：每个问题的唯一标识符。
- `question` (VARCHAR, NOT NULL)：题目的具体内容。
- `dimension` (ENUM, NOT NULL)：题目所属的人格维度。可以使用枚举类型来限制维度的取值为开放性、尽责性、外向性、宜人性和神经质。
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)：记录创建时间。
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)：记录更新时间。

## 二、SQL 创建表的语句

```sql
CREATE TABLE personality_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    dimension ENUM('Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 三、插入数据的示例语句

```sql
INSERT INTO personality_questions (question, dimension) VALUES
('我喜欢尝试新的和不同的事情。', 'Openness'),
('我常常对艺术或音乐表现出浓厚的兴趣。', 'Openness'),
('我喜欢冥想和深思。', 'Openness'),
('我常常被大自然的美丽所打动。', 'Openness'),
('我倾向于在工作中使用新方法而不是沿用旧方法。', 'Openness'),
('我喜欢探索不同的文化和传统。', 'Openness'),
('我对未来充满幻想和想象。', 'Openness'),
('我享受复杂和抽象的讨论。', 'Openness'),
('我容易接受新的和不同的观点。', 'Openness'),
('我喜欢读科幻小说和幻想类书籍。', 'Openness'),
('我对哲学问题感兴趣。', 'Openness'),
('我对技术和科学的进步感到兴奋。', 'Openness'),
('我喜欢参加艺术展览和画廊。', 'Openness'),
('我乐于改变和革新。', 'Openness'),
('我喜欢思考人生的意义和目的。', 'Openness'),
('我对前沿时尚和设计感兴趣。', 'Openness'),

('我总是按时完成任务。', 'Conscientiousness'),
('我是一个非常有条理的人。', 'Conscientiousness'),
('我通常会提前为事情做准备。', 'Conscientiousness'),
('我对自己的工作标准非常高。', 'Conscientiousness'),
('我不轻易放弃任务，即使它很困难。', 'Conscientiousness'),
('我通常在截止日期之前完成工作。', 'Conscientiousness'),
('我喜欢制定详细的计划。', 'Conscientiousness'),
('我尽力做到尽善尽美。', 'Conscientiousness'),
('我在工作中很少犯错。', 'Conscientiousness'),
('我是一个非常可靠和可信赖的人。', 'Conscientiousness'),
('我总是按时出席会议和约会。', 'Conscientiousness'),
('我会在开始之前认真检查我的工作。', 'Conscientiousness'),
('我喜欢保持工作和生活的整洁。', 'Conscientiousness'),
('我对细节非常关注。', 'Conscientiousness'),
('我能很好地管理时间。', 'Conscientiousness'),
('我会定期评估自己的目标和进展。', 'Conscientiousness'),

('我喜欢与人交往。', 'Extraversion'),
('我在社交场合中感到很自在。', 'Extraversion'),
('我喜欢参加聚会和社交活动。', 'Extraversion'),
('我经常感到充满活力和热情。', 'Extraversion'),
('我喜欢成为注意力的焦点。', 'Extraversion'),
('我通常是第一个与新认识的人交谈的人。', 'Extraversion'),
('我喜欢在团队中工作。', 'Extraversion'),
('我经常感到兴奋和愉快。', 'Extraversion'),
('我很容易与陌生人建立联系。', 'Extraversion'),
('我喜欢公开演讲和展示。', 'Extraversion'),
('我在群体中感到很舒服。', 'Extraversion'),
('我喜欢参与社交俱乐部和组织。', 'Extraversion'),
('我常常是活动和聚会的发起者。', 'Extraversion'),
('我享受大声笑和开玩笑。', 'Extraversion'),
('我在竞争中感到兴奋。', 'Extraversion'),
('我喜欢在多人面前表演或展示才艺。', 'Extraversion'),

('我愿意帮助别人，即使这对我没有好处。', 'Agreeableness'),
('我通常对人友善和宽容。', 'Agreeableness'),
('我容易信任他人。', 'Agreeableness'),
('我对别人的感觉非常敏感。', 'Agreeableness'),
('我喜欢与他人合作而不是竞争。', 'Agreeableness'),
('我通常能够很好地理解别人的感受。', 'Agreeableness'),
('我愿意为他人的幸福做出牺牲。', 'Agreeableness'),
('我喜欢与人分享我的资源和时间。', 'Agreeableness'),
('我很少与人发生争执。', 'Agreeableness'),
('我喜欢和谐的环境。', 'Agreeableness'),
('我容易原谅别人的错误。', 'Agreeableness'),
('我常常给予别人赞美和鼓励。', 'Agreeableness'),
('我愿意倾听别人的问题和担忧。', 'Agreeableness'),
('我在团队中是一个和平的调解者。', 'Agreeableness'),
('我关心别人的福祉。', 'Agreeableness'),
('我愿意与人共同承担责任和义务。', 'Agreeableness'),

('我容易感到紧张和焦虑。', 'Neuroticism'),
('我经常感到沮丧或悲伤。', 'Neuroticism'),
('我容易因为小事而烦恼。', 'Neuroticism'),
('我常常感到不安。', 'Neuroticism'),
('我容易生气或恼怒。', 'Neuroticism'),
('我经常感到疲倦和无力。', 'Neuroticism'),
('我容易感到孤独和被忽视。', 'Neuroticism'),
('我常常对未来感到担忧。', 'Neuroticism'),
('我对批评非常敏感。', 'Neuroticism'),
('我常常感到无助和绝望。', 'Neuroticism'),
('我容易被压力压垮。', 'Neuroticism'),
('我经常感到紧张和烦躁不安。', 'Neuroticism'),
('我在处理冲突时感到困难。', 'Neuroticism'),
('我容易受到负面情绪的影响。', 'Neuroticism'),
('我在压力下容易崩溃。', 'Neuroticism'),
('我常常感到恐惧和焦虑。', 'Neuroticism');
```

```sql
INSERT INTO personality_questions (question, dimension) VALUES
-- Openness
('我对未来的科技发展充满好奇。', 'Openness'),
('我喜欢思考宇宙的奥秘和未解之谜。', 'Openness'),
('我喜欢尝试新的食物和美食文化。', 'Openness'),
('我对创新和新技术感兴趣。', 'Openness'),
('我喜欢探索不同的音乐风格。', 'Openness'),
('我愿意尝试新的旅行目的地。', 'Openness'),
('我喜欢参加文化交流活动。', 'Openness'),
('我对人类历史和文明发展感兴趣。', 'Openness'),
('我喜欢尝试新的艺术形式，如绘画或雕塑。', 'Openness'),
('我容易被新想法和概念吸引。', 'Openness'),
('我愿意挑战传统观念和做法。', 'Openness'),
('我喜欢学习新的语言或技能。', 'Openness'),
('我喜欢独立思考和独立工作。', 'Openness'),
('我乐于接受艺术家和创作者的观点。', 'Openness'),
('我对未知的事物充满好奇心。', 'Openness'),
('我喜欢与不同背景的人交流和交往。', 'Openness'),
('我倾向于有自己的独特想法和见解。', 'Openness'),
('我对社会变革和进步持开放态度。', 'Openness'),
('我喜欢参加学术或知识分享活动。', 'Openness'),
('我常常思考人类发展的未来方向。', 'Openness'),
('我愿意探索哲学的深奥问题。', 'Openness'),
('我喜欢追寻艺术和文化的深层含义。', 'Openness'),
('我希望能够了解不同文化背景下的人们。', 'Openness'),

-- Conscientiousness
('我喜欢把事情安排得井井有条。', 'Conscientiousness'),
('我总是保持我的工作环境整洁。', 'Conscientiousness'),
('我会为了完成任务而牺牲个人休息时间。', 'Conscientiousness'),
('我认为规划和计划是成功的关键。', 'Conscientiousness'),
('我经常制定长期的个人和职业目标。', 'Conscientiousness'),
('我喜欢追求高效率和高质量的工作。', 'Conscientiousness'),
('我坚持遵守时间约定和承诺。', 'Conscientiousness'),
('我习惯于将工作和任务按重要性排序。', 'Conscientiousness'),
('我会在面对困难时坚持不懈地努力。', 'Conscientiousness'),
('我喜欢制定详细的日程安排。', 'Conscientiousness'),
('我常常会提前准备好重要的会议或活动。', 'Conscientiousness'),
('我努力保持高标准的工作质量。', 'Conscientiousness'),
('我喜欢对自己的工作进行全面的检查和审查。', 'Conscientiousness'),
('我认为时间管理是成功的关键因素。', 'Conscientiousness'),
('我习惯于自我评估和反思。', 'Conscientiousness'),
('我觉得执行力和自律性对我很重要。', 'Conscientiousness'),
('我会对工作中的细节进行精确和认真的处理。', 'Conscientiousness'),
('我会为了完成任务而推迟自己的娱乐活动。', 'Conscientiousness'),
('我经常会制定长远的个人发展计划。', 'Conscientiousness'),
('我喜欢计划和组织社交活动。', 'Conscientiousness'),
('我在工作中力求完美和卓越。', 'Conscientiousness'),
('我认为责任感是我成功的重要支柱。', 'Conscientiousness'),
('我会为了工作成就而牺牲一些个人兴趣。', 'Conscientiousness'),

-- Extraversion
('我经常主动与陌生人交流和互动。', 'Extraversion'),
('我喜欢在大型社交场合中表现自己。', 'Extraversion'),
('我经常是朋友圈子中的领导者或活跃者。', 'Extraversion'),
('我享受成为团队合作的关键成员。', 'Extraversion'),
('我通常会主动邀请朋友或同事一起做事。', 'Extraversion'),
('我喜欢在人群中展示自己的才能和技能。', 'Extraversion'),
('我经常参加社交活动并积极参与其中。', 'Extraversion'),
('我乐于发表自己的观点和看法。', 'Extraversion'),
('我在与他人交往时表现得很外向。', 'Extraversion'),
('我通常会成为群体讨论的中心人物。', 'Extraversion'),
('我乐于参加大型活动和节日庆典。', 'Extraversion'),
('我喜欢与人分享自己的经验和故事。', 'Extraversion'),
('我经常在社交媒体上分享我的生活和观点。', 'Extraversion'),
('我在社交场合中总是表现得很活跃和开放。', 'Extraversion'),
('我喜欢和不同背景的人交朋友。', 'Extraversion'),
('我很容易融入新的社交圈子或环境。', 'Extraversion'),
('我经常主动与同事或朋友进行谈话。', 'Extraversion'),
('我在团队中喜欢扮演社交联络的角色。', 'Extraversion'),
('我总是乐于参加团队或社区的活动。', 'Extraversion'),
('我喜欢在大众面前发表演讲或演示。', 'Extraversion'),
('我认为交往和社交对我很重要。', 'Extraversion'),
('我愿意为团队或组织做出社交贡献。', 'Extraversion'),
('我在群体中经常表现得很外向和开朗。', 'Extraversion'),

-- Agreeableness
('我乐于帮助他人解决问题或困难。', 'Agreeableness'),
('我愿意为了帮助他人而牺牲一些个人利益。', 'Agreeableness'),
('我喜欢与他人和睦相处和合作。', 'Agreeableness'),
('我通常会给予别人更多的宽容和理解。', 'Agreeableness'),
('我乐意分享我的知识和资源给他人。', 'Agreeableness'),
('我喜欢通过合作来实现共同的目标。', 'Agreeableness'),
('我经常关心他人的感受和需要。', 'Agreeableness'),
('我愿意为了维护团队的和谐而做出让步。', 'Agreeableness'),
('我很少会与他人产生争执或冲突。', 'Agreeableness'),
('我习惯于赞扬和鼓励身边的人。', 'Agreeableness'),
('我认为合作和共赢是最佳的解决方案。', 'Agreeableness'),
('我愿意为了团队的成功而承担一定的风险。', 'Agreeableness'),
('我喜欢与他人分享生活中的喜悦和乐趣。', 'Agreeableness'),
('我通常能够理解和接纳不同意见和观点。', 'Agreeableness'),
('我乐于承担一些额外的工作负担。', 'Agreeableness'),
('我愿意倾听他人的意见和建议。', 'Agreeableness'),
('我经常主动提供帮助和支持给身边的人。', 'Agreeableness'),
('我重视团队的和谐和合作氛围。', 'Agreeableness'),
('我通常会为了帮助别人而调整自己的计划。', 'Agreeableness'),
('我愿意为了帮助社区或组织而参与志愿服务。', 'Agreeableness'),
('我认为和谐和融洽的关系对我很重要。', 'Agreeableness'),
('我乐于分享我的经验和智慧给他人。', 'Agreeableness'),
('我常常会为了团队或组织的利益而做出个人牺牲。', 'Agreeableness'),

-- Neuroticism
('我容易感到紧张和焦虑。', 'Neuroticism'),
('我对未来的不确定性感到害怕。', 'Neuroticism'),
('我经常会感到内心不安和不安全。', 'Neuroticism'),
('我总是担心自己的决策是否正确。', 'Neuroticism'),
('我很容易受到他人言论的伤害。', 'Neuroticism'),
('我常常会因为他人的评价而感到不安。', 'Neuroticism'),
('我对自己的能力和价值产生怀疑。', 'Neuroticism'),
('我常常会为了琐事而感到烦躁和不满。', 'Neuroticism'),
('我在面对挑战和困难时很容易崩溃。', 'Neuroticism'),
('我总是担心自己会失败或失去控制。', 'Neuroticism'),
('我对生活中的风险和危险感到敏感。', 'Neuroticism'),
('我经常感到自己处于压力之下。', 'Neuroticism'),
('我会因为小事而感到不安和沮丧。', 'Neuroticism'),
('我常常会为了别人的问题而感到焦虑。', 'Neuroticism'),
('我经常会因为工作压力而失眠。', 'Neuroticism'),
('我对未来的发展和变化感到担忧。', 'Neuroticism'),
('我容易因为健康问题而感到焦虑和恐惧。', 'Neuroticism'),
('我很难控制自己的情绪波动。', 'Neuroticism'),
('我经常会因为家庭问题而感到心烦意乱。', 'Neuroticism'),
('我对未来的不可预见性感到不安。', 'Neuroticism'),
('我会因为社交场合而感到紧张和不安。', 'Neuroticism'),
('我很容易因为不确定的未来而焦虑不安。', 'Neuroticism'),
('我总是担心自己的健康和安全。', 'Neuroticism');

-- 插入完毕，共计120个新问题

```

## 四、解释

- `id`：每个题目的唯一标识符，由数据库自动生成。
- `question`：存储题目的内容，使用 `VARCHAR(255)` 类型。
- `dimension`：存储题目所属的人格维度，使用 `ENUM` 类型来限制取值范围。
- `created_at` 和 `updated_at`：记录题目创建和更新时间，便于日后维护和管理。
