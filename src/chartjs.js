var virusChart = document.getElementById('virusChart').getContext('2d');

var virusSimChart = new Chart(virusChart, {
    type: 'line',
    data: {
        labels: ['Healthy', 'Infected', 'Cured', 'Dead'],
        datasets: [{
            label: 'Infection spread',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    },

    // Configuration options go here
    options: {}
});