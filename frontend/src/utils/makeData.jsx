function makeData(count){
    const data = {
      labels: ['NEG', 'NEU', 'POS'],
      datasets: [
        {
          label: ['Sentiment'],
          data: count,
          backgroundColor: [
            'rgba(255, 0, 0, 0.6)',
                  'rgba(0, 0, 255, 0.6)',
                  'rgba(0, 255, 0, 0.6)'
          ]
        }
      ]
    }
    return data;
  }

export default makeData