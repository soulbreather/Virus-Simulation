var virusChart = document.getElementById('virusChart').getContext('2d');
var virusSimChart = new Chart(virusChart, {
    type: 'doughnut',
    data: {
        labels: ['Healthy', 'Infected', 'Recovered', 'Dead'],
        datasets: [{
            data: [],

            backgroundColor: [
                'rgba(255, 255, 255, 0.7)',
                'rgba(255, 0, 0, 0.7)',
                'rgba(0, 255, 0, 0.7)',
                'rgba(0, 0, 0, 0.7)'
            ],
            borderColor: 'rgba(0, 0, 0, 0.4)',
            borderAlign: 'inner',
            borderWidth: 1.5,
            borderWidth: 3.5,
        }],
    },
    options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(0,0,0)',
                fontSize: 15,
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 10,
            },
        },
    },
});

function updateGraph() {
    let temp_infected = 0;
    for (let i = 0; i < amount_of_people; i++) {
        if (list_of_people[i].infected && !list_of_people[i].dead && !list_of_people[i].recovered) {
            temp_infected += 1;
        }
    }
    console.log(temp_infected);
    if (temp_infected != 0) {
        let datasets = virusSimChart.data.datasets;

        datasets[0].data[0] = updateHealthyPeople()
        datasets[0].data[1] = updateInfectedPeople()
        datasets[0].data[2] = updateRecoveredPeople()
        datasets[0].data[3] = updateDeadPeople()


        virusSimChart.update();
    }
    return temp_infected
}

function updateGraphSlow() {
    let datasets = virusSimChart.data.datasets;

    datasets[0].data[0] = updateHealthyPeople()
    datasets[0].data[1] = updateInfectedPeople()
    datasets[0].data[2] = updateRecoveredPeople()
    datasets[0].data[3] = updateDeadPeople()


    virusSimChart.update();

}