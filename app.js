document.addEventListener('DOMContentLoaded', function() {
    const weightForm = document.getElementById('weightForm');
    const weightInput = document.getElementById('weight');
    const dateInput = document.getElementById('date');
    const weightChartCanvas = document.getElementById('weightChart').getContext('2d');

    let weightData = JSON.parse(localStorage.getItem('weightData')) || [];

    const weightChart = new Chart(weightChartCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Peso (kg)',
                data: [],
                borderColor: '#28a745',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }}
        });

        function updateChart() {
            weightChart.data.labels = weightData.map(entry => entry.date);
            weightChart.data.datasets[0].data = weightData.map(entry => entry.weight);
            weightChart.update();
        }

        weightForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const weight = parseFloat(weightInput.value);
            const date = dateInput.value;

            if (weight && date) {
                weightData.push({ weight, date });
                localStorage.setItem('weightData', JSON.stringify(weightData));
                updateChart();
                weightInput.value = '';
                dateInput.value = '';
            }
        });

        updateChart();
});