function calculate() {
    const monthlyAmount = parseFloat(document.getElementById('monthlyAmount').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    if (isNaN(monthlyAmount) || isNaN(annualRate) || isNaN(years)) {
        alert('请输入有效的参数！');
        return;
    }

    const result = [];
    let totalPrincipal = 0;
    let totalInterest = 0;
    let totalAmount = 0;
    let interestPerPeriod = 0;

    for (let year = 1; year <= years; year++) {
        let yearInterest = (totalAmount + totalPrincipal) * annualRate;
        totalAmount += yearInterest + totalPrincipal * 12; // 每年增加的本息
        totalPrincipal += monthlyAmount * 12; // 每年累计存入

        result.push({
            year,
            accumulatedDeposit: totalPrincipal.toFixed(2),
            interestPerPeriod: yearInterest.toFixed(2),
            accumulatedInterest: totalInterest.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        });

        totalInterest += yearInterest; // 累计利息
    }

    // 更新表格
    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';
    result.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${row.year}</td>
        <td>${row.accumulatedDeposit}</td>
        <td>${row.interestPerPeriod}</td>
        <td>${row.accumulatedInterest}</td>
        <td>${row.totalAmount}</td>
      `;
        tbody.appendChild(tr);
    });

    // 绘制ECharts图表
    const chart = echarts.init(document.getElementById('chart'));
    const option = {
        xAxis: {
            type: 'category',
            data: result.map((row) => `第${row.year}年`)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: result.map((row) => row.totalAmount),
                type: 'line',
                smooth: true
            }
        ]
    };
    chart.setOption(option);
}
