// 导航栏切换功能
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 移除所有导航链接的active类
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // 添加当前链接的active类
        link.classList.add('active');
        
        // 隐藏所有章节
        sections.forEach(section => section.classList.remove('active'));
        
        // 显示对应章节
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
        
        // 平滑滚动到对应章节
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// 任务筛选功能
const filterBtns = document.querySelectorAll('.filter-btn');
const missionCards = document.querySelectorAll('.mission-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有筛选按钮的active类
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        
        // 添加当前按钮的active类
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // 筛选任务卡片
        missionCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 详情模态框功能
const modal = document.getElementById('missionModal');
const closeBtn = document.querySelector('.close-btn');
const modalBody = document.getElementById('modalBody');
const detailBtns = document.querySelectorAll('.detail-btn');

// 任务详情数据
const missionDetails = {
    shenzhou1: {
        title: '神舟一号',
        date: '1999年11月20日',
        type: '无人任务',
        description: '中国载人航天工程的首次飞行，考核了运载火箭性能和可靠性，验证了飞船关键技术和系统设计的正确性，以及包括发射、测控通信、着陆回收等地面设施在内的整个系统工作的协调性，标志着我国载人航天技术实现新的重大突破。',
        achievements: '首次验证了飞船关键技术和系统设计的正确性，为后续载人飞行奠定了基础。'
    },
    shenzhou2: {
        title: '神舟二号',
        date: '2001年1月10日',
        type: '无人任务',
        description: '我国第一艘正样无人飞船，飞船技术状态与载人飞船基本一致。',
        achievements: '进一步验证了飞船的技术状态，为载人飞行做准备。'
    },
    shenzhou3: {
        title: '神舟三号',
        date: '2002年3月25日',
        type: '无人任务',
        description: '搭载了人体代谢模拟装置、拟人生理信号设备以及形体假人，能够定量模拟航天员呼吸和血液循环的重要生理活动参数。',
        achievements: '验证了飞船的环境控制与生命保障系统，为载人飞行做准备。'
    },
    shenzhou4: {
        title: '神舟四号',
        date: '2002年12月30日',
        type: '无人任务',
        description: '突破了我国低温发射的历史纪录，在完成预定空间科学和技术实验任务后，于2003年1月5日在内蒙古中部地区准确着陆。这艘飞船技术状态与载人飞船完全一致。',
        achievements: '验证了飞船在低温条件下的发射和运行能力，为载人飞行做准备。'
    },
    shenzhou5: {
        title: '神舟五号',
        date: '2003年10月15日',
        type: '载人任务',
        astronauts: '杨利伟',
        description: '我国首飞航天员杨利伟搭乘神舟五号飞船在轨飞行14圈，历时21小时23分后安全返回，实现了“成功发射、精确测控、正常运行、安全返回”的任务目标。',
        achievements: '标志着我国成为世界上第三个独立掌握载人航天技术的国家。'
    },
    shenzhou6: {
        title: '神舟六号',
        date: '2005年10月12日',
        type: '载人任务',
        astronauts: '费俊龙、聂海胜',
        description: '航天员费俊龙、聂海胜搭乘神舟六号飞船进入太空，于10月17日安全返回，实现了“成功发射、正常飞行、安全返回、航天员健康出舱”的任务目标，掌握了环境控制与生命保障、飞行器控制、航天医学保障等载人飞船“多人多天”在轨飞行关键技术，首次开展了真正意义上有人参与的空间科学实验。',
        achievements: '实现了多人多天飞行试验，掌握了载人飞船“多人多天”在轨飞行关键技术。'
    },
    shenzhou7: {
        title: '神舟七号',
        date: '2008年9月25日',
        type: '载人任务',
        astronauts: '翟志刚、刘伯明、景海鹏',
        description: '航天员翟志刚、刘伯明、景海鹏搭乘神舟七号飞船进入太空，翟志刚于9月27日成功实施首次空间出舱活动；9月28日，航天员安全返回，实现了“准确入轨、正常运行，出舱活动圆满、安全健康返回”的任务目标。',
        achievements: '突破和掌握了空间出舱活动技术，是我国载人航天事业发展史上的又一重要里程碑。'
    },
    shenzhou8: {
        title: '神舟八号',
        date: '2011年11月1日',
        type: '无人任务',
        description: '神舟八号飞船在酒泉卫星发射中心发射成功，于11月3日与天宫一号成功实现首次交会对接，11月14日成功进行第二次交会对接，11月17日安全返回，实现了“准确进入轨道、精确交会对接、稳定组合运行、安全撤离返回”的任务目标。',
        achievements: '标志着我国空间交会对接技术取得重大突破。'
    },
    shenzhou9: {
        title: '神舟九号',
        date: '2012年6月16日',
        type: '载人任务',
        astronauts: '景海鹏、刘旺、刘洋',
        description: '航天员景海鹏、刘旺、刘洋搭乘神舟九号飞船进入太空，于6月18日，与天宫一号实现自动交会对接，航天员进入天宫一号工作和生活；6月24日，刘旺手动控制飞船与天宫一号成功对接；6月29日，航天员安全返回，实现了“准确进入轨道，精准操控对接，稳定组合运行，安全健康返回”的任务目标。',
        achievements: '突破和掌握了航天员手控交会对接技术，刘洋成为我国首飞女航天员。'
    },
    shenzhou10: {
        title: '神舟十号',
        date: '2013年6月11日',
        type: '载人任务',
        astronauts: '聂海胜、张晓光、王亚平',
        description: '航天员聂海胜、张晓光、王亚平搭乘神舟十号飞船进入太空，于6月13日，与天宫一号实现自动交会对接，航天员进入天宫一号工作和生活；6月20日，3名航天员成功开展我国首次太空授课任务，王亚平成为首位太空教师；6月23日，聂海胜手动控制飞船与天宫一号成功对接；6月26日，航天员安全返回，实现了“准确进入轨道、精准操控对接、稳定组合运行、健康在轨驻留、安全顺利返回”的任务目标。',
        achievements: '进一步考核了交会对接、载人天地往返运输系统的功能和性能，圆满完成我国载人天地往返运输系统首次应用性飞行。'
    },
    shenzhou11: {
        title: '神舟十一号',
        date: '2016年10月17日',
        type: '载人任务',
        astronauts: '景海鹏、陈冬',
        description: '航天员景海鹏和陈冬入驻天宫二号空间实验室，进行了为期30天的太空驻留生活。10月19日，神舟十一号与天宫二号自动交会对接成功。',
        achievements: '首次实现了我国航天员中期在轨驻留。'
    },
    shenzhou12: {
        title: '神舟十二号',
        date: '2021年6月17日',
        type: '载人任务',
        astronauts: '聂海胜、刘伯明、汤洪波',
        description: '航天员聂海胜、刘伯明、汤洪波在空间站进行了为期3个月的驻留，于9月17日安全返回。在轨期间进行了2次出舱活动，开展了一系列空间科学实验和技术试验，验证了航天员长期驻留、再生生保、出舱活动、舱外操作等空间站建造和运营关键技术，首次检验了东风着陆场的搜索回收能力。',
        achievements: '验证了空间站建造和运营关键技术，首次检验了东风着陆场的搜索回收能力。'
    },
    shenzhou13: {
        title: '神舟十三号',
        date: '2021年10月16日',
        type: '载人任务',
        astronauts: '翟志刚、王亚平、叶光富',
        description: '航天员翟志刚、王亚平、叶光富在空间站进行了为期6个月的驻留，于2022年4月16日安全返回，此次任务创造了中国航天员连续在轨飞行时长新纪录。在轨期间先后进行了2次出舱活动，2次太空授课，开展了手控遥操作交会对接、机械臂辅助舱段转位等多项科学技术实（试）验，验证了航天员长期驻留保障、出舱活动、在轨维修等关键技术。',
        achievements: '创造了中国航天员连续在轨飞行时长新纪录，验证了航天员长期驻留保障等关键技术。'
    },
    shenzhou14: {
        title: '神舟十四号',
        date: '2022年6月5日',
        type: '载人任务',
        astronauts: '陈冬、刘洋、蔡旭哲',
        description: '航天员陈冬、刘洋、蔡旭哲在空间站进行为期6个月的驻留任务。在轨期间完成了多次出舱任务和一次太空授课任务，还迎来了问天实验舱、梦天实验舱与核心舱的交会对接，完成中国空间站T字基本构型在轨组装建造等多项任务。',
        achievements: '完成了中国空间站T字基本构型在轨组装建造，开启中国人太空“三居室”时代。'
    },
    shenzhou15: {
        title: '神舟十五号',
        date: '2022年11月29日',
        type: '载人任务',
        astronauts: '费俊龙、邓清明、张陆',
        description: '航天员费俊龙17年后重返太空，邓清明、张陆在追梦25年和12年后首次飞天，他们不仅刷新了中国航天员单个乘组出舱活动次数的纪录，还与神舟十四号乘组完成首次太空会师，见证了中国空间站全面建成的历史时刻。',
        achievements: '与神舟十四号乘组完成首次太空会师，见证了中国空间站全面建成的历史时刻。'
    },
    shenzhou16: {
        title: '神舟十六号',
        date: '2023年5月30日',
        type: '载人任务',
        astronauts: '景海鹏、朱杨柱、桂海潮',
        description: '空间站迎来了神舟十六号乘组，这是一个由航天驾驶员景海鹏和我国首位航天飞行工程师朱杨柱、首位载荷专家桂海潮组成的全新阵容。3名航天员在轨期间进行了出舱活动、中国空间站第四次太空授课活动，完成了空间站多次货物出舱任务。',
        achievements: '朱杨柱成为我国首位航天飞行工程师，桂海潮成为首位载荷专家，标志着中国航天员队伍结构更加完善。'
    },
    shenzhou17: {
        title: '神舟十七号',
        date: '2023年10月26日',
        type: '载人任务',
        astronauts: '汤洪波、唐胜杰、江新林',
        description: '航天员汤洪波、唐胜杰、江新林入驻空间站，开展空间科学实验和技术试验。',
        achievements: '唐胜杰和江新林作为第三批航天员首次执行太空任务。'
    },
    shenzhou18: {
        title: '神舟十八号',
        date: '2024年4月25日',
        type: '载人任务',
        astronauts: '叶光富、李聪、李广苏',
        description: '航天员叶光富、李聪、李广苏入驻空间站，开展空间科学实验和技术试验。',
        achievements: '李聪和李广苏作为第三批航天员首次执行太空任务。'
    },
    shenzhou19: {
        title: '神舟十九号',
        date: '2024年10月30日',
        type: '载人任务',
        astronauts: '蔡旭哲、宋令东、王浩泽',
        description: '航天员蔡旭哲、宋令东、王浩泽入驻空间站，其间迎来天舟八号货运飞船、神舟二十号载人飞船的来访对接，并完成与神舟二十号乘组的在轨轮换交接。',
        achievements: '蔡旭哲已执行5次出舱活动，成为出舱次数最多的中国航天员；宋令东成为我国首名进行出舱活动的90后航天员；王浩泽成为首位进驻空间站的女航天飞行工程师。'
    },
    shenzhou20: {
        title: '神舟二十号',
        date: '2025年4月24日',
        type: '载人任务',
        astronauts: '陈冬、陈中瑞、王杰',
        description: '航天员陈冬、陈中瑞、王杰入驻空间站，开启为期6个月的巡天之旅。在轨期间完成了4次出舱活动和多次货物进出舱任务，开展了涉及微重力基础物理、空间材料科学、空间生命科学、航天医学、航天技术等领域的大量空间科学实（试）验。',
        achievements: '刷新了中国航天员单个乘组在轨驻留时间最长纪录，在轨时间达到204天。'
    },
    shenzhou21: {
        title: '神舟二十一号',
        date: '2025年11月14日',
        type: '载人任务',
        astronauts: '陈冬、陈中瑞、王杰',
        description: '神舟二十号航天员乘组搭乘神舟二十一号飞船安全返回，完成在轨轮换。',
        achievements: '成功完成在轨轮换任务，确保空间站的持续运营。'
    },
    shenzhou22: {
        title: '神舟二十二号',
        date: '2025年11月25日',
        type: '载人任务',
        description: '作为应急救援备份飞船发射升空，与空间站组合体完成自主快速交会对接。',
        achievements: '中国载人航天史上首次应急发射取得圆满成功。'
    }
};

// 打开模态框
 detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const missionId = btn.getAttribute('data-id');
        const mission = missionDetails[missionId];
        
        // 填充模态框内容
        let modalContent = `
            <h3>${mission.title}</h3>
            <p><strong>发射日期：</strong>${mission.date}</p>
            <p><strong>任务类型：</strong>${mission.type}</p>
        `;
        
        if (mission.astronauts) {
            modalContent += `<p><strong>航天员：</strong>${mission.astronauts}</p>`;
        }
        
        modalContent += `
            <p><strong>任务描述：</strong>${mission.description}</p>
            <p><strong>主要成就：</strong>${mission.achievements}</p>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.style.display = 'block';
    });
});

// 关闭模态框
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 页面加载时显示首页
window.addEventListener('load', () => {
    document.getElementById('home').classList.add('active');
    document.querySelector('a[href="#home"]').classList.add('active');
});