 import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { TrendingUp, DollarSign, Percent, Calendar, Plus, Trash2, ToggleLeft, ToggleRight, Settings } from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

type ContributionFrequency = 'weekly' | 'biweekly' | 'monthly' | 'annually'
type CalculatorMode = 'simple' | 'variable'

interface InvestmentCheckpoint {
  id: string
  startYear: number
  contributionAmount: number
  contributionFrequency: ContributionFrequency
}

interface SimpleInvestmentData {
  initialAmount: number
  contributionAmount: number
  contributionFrequency: ContributionFrequency
  annualReturn: number
  years: number
}

interface VariableInvestmentData {
  initialAmount: number
  annualReturn: number
  years: number
  checkpoints: InvestmentCheckpoint[]
}

const InvestmentCalculator = () => {
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('simple')
  
  const [simpleData, setSimpleData] = useState<SimpleInvestmentData>({
    initialAmount: 10000,
    contributionAmount: 500,
    contributionFrequency: 'monthly',
    annualReturn: 4,
    years: 20
  })
  
  const [variableData, setVariableData] = useState<VariableInvestmentData>({
    initialAmount: 10000,
    annualReturn: 4,
    years: 20,
    checkpoints: [
      {
        id: '1',
        startYear: 0,
        contributionAmount: 500,
        contributionFrequency: 'monthly'
      }
    ]
  })

  const [chartData, setChartData] = useState<any>(null)

  // Helper function to get monthly contribution amount
  const getContributionPerMonth = (amount: number, frequency: ContributionFrequency) => {
    switch (frequency) {
      case 'weekly':
        return amount * 4.33 // Average weeks per month
      case 'biweekly':
        return amount * 2.17 // Average biweekly periods per month
      case 'monthly':
        return amount
      case 'annually':
        return amount / 12
      default:
        return amount
    }
  }

  const calculateSimpleInvestment = (data: SimpleInvestmentData) => {
    const monthlyReturn = data.annualReturn / 100 / 12
    const totalMonths = data.years * 12
    const contributionPerMonth = getContributionPerMonth(data.contributionAmount, data.contributionFrequency)
    
    const labels: string[] = []
    const totalInvested: number[] = []
    const totalValue: number[] = []
    const totalGrowth: number[] = []
    
    for (let month = 0; month <= totalMonths; month += 12) {
      const year = month / 12
      labels.push(`Year ${year}`)
      
      // Calculate conventional growth with proper compound interest
      let conventionalValue = data.initialAmount
      let conventionalContributed = data.initialAmount
      
      for (let m = 0; m < month; m++) {
        conventionalValue = conventionalValue * (1 + monthlyReturn) + contributionPerMonth
        conventionalContributed += contributionPerMonth
      }
      
      // Calculate halal growth (assuming profit-sharing or asset-backed returns)
      const halalReturn = data.annualReturn * 0.85 // Slightly lower for halal investments
      const halalMonthlyReturn = halalReturn / 100 / 12
      let halalValue = data.initialAmount
      let halalContributed = data.initialAmount
      
      for (let m = 0; m < month; m++) {
        halalValue = halalValue * (1 + halalMonthlyReturn) + contributionPerMonth
        halalContributed += contributionPerMonth
      }
      
      totalInvested.push(conventionalContributed)
      totalValue.push(conventionalValue)
      totalGrowth.push(halalValue - halalContributed) // Investment total - total contributions
    }
    
    return { labels, totalInvested, totalValue, totalGrowth }
  }

  const calculateVariableInvestment = (data: VariableInvestmentData) => {
    const totalMonths = data.years * 12
    
    const labels: string[] = []
    const totalInvested: number[] = []
    const totalValue: number[] = []
    const totalGrowth: number[] = []
    
    // Sort checkpoints by start year to ensure proper order
    const sortedCheckpoints = [...data.checkpoints].sort((a, b) => a.startYear - b.startYear)
    
    for (let month = 0; month <= totalMonths; month += 12) {
      const year = month / 12
      labels.push(`Year ${year}`)
      
      let conventionalValue = data.initialAmount
      let conventionalContributed = data.initialAmount
      let halalValue = data.initialAmount
      let halalContributed = data.initialAmount
      
      // Calculate month by month, applying different checkpoint parameters
      for (let m = 0; m < month; m++) {
        const currentYear = m / 12
        
        // Find which checkpoint applies to this month
        // Use the latest checkpoint that has started by this point
        let activeCheckpoint = null
        for (let i = sortedCheckpoints.length - 1; i >= 0; i--) {
          if (currentYear >= sortedCheckpoints[i].startYear) {
            activeCheckpoint = sortedCheckpoints[i]
            break
          }
        }
        
        if (activeCheckpoint) {
          const monthlyReturn = data.annualReturn / 100 / 12
          const contributionPerMonth = getContributionPerMonth(
            activeCheckpoint.contributionAmount, 
            activeCheckpoint.contributionFrequency
          )
          
          // Apply growth and add contribution
          conventionalValue = conventionalValue * (1 + monthlyReturn) + contributionPerMonth
          conventionalContributed += contributionPerMonth
          
          // Halal calculation (slightly lower returns)
          const halalReturn = data.annualReturn * 0.85
          const halalMonthlyReturn = halalReturn / 100 / 12
          halalValue = halalValue * (1 + halalMonthlyReturn) + contributionPerMonth
          halalContributed += contributionPerMonth
        }
      }
      
      totalInvested.push(conventionalContributed)
      totalValue.push(conventionalValue)
      totalGrowth.push(halalValue - halalContributed) // Investment total - total contributions
    }
    
    return { labels, totalInvested, totalValue, totalGrowth }
  }

  useEffect(() => {
    const data = calculatorMode === 'simple' 
      ? calculateSimpleInvestment(simpleData)
      : calculateVariableInvestment(variableData)
    
    setChartData({
      labels: data.labels,
      datasets: [
        {
          label: 'Contributions',
          data: data.totalInvested,
          borderColor: '#a0aec0',
          backgroundColor: 'rgba(160, 174, 192, 0.1)',
          pointBackgroundColor: '#a0aec0',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#718096',
          pointHoverBorderColor: '#ffffff',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Total Growth',
          data: data.totalGrowth,
          borderColor: '#4299e1',
          backgroundColor: 'rgba(66, 153, 225, 0.1)',
          pointBackgroundColor: '#4299e1',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#3182ce',
          pointHoverBorderColor: '#ffffff',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Investment Total',
          data: data.totalValue,
          borderColor: '#48bb78',
          backgroundColor: 'rgba(72, 187, 120, 0.1)',
          pointBackgroundColor: '#48bb78',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#38a169',
          pointHoverBorderColor: '#ffffff',
          fill: false,
          tension: 0.4
        }
      ]
    })
  }, [calculatorMode, simpleData, variableData])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: 'Poppins',
            size: 14,
            weight: 500
          },
          color: '#4a5568'
        }
      },
      title: {
        display: true,
        text: 'Investment Growth Comparison'
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1a202c',
        bodyColor: '#4a5568',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        titleFont: {
          family: 'Poppins',
          size: 14,
          weight: 600
        },
        bodyFont: {
          family: 'Roboto',
          size: 13
        },
        callbacks: {
          label: function(context: any) {
            const num = context.parsed.y
            let formattedValue
            if (num >= 1000000) {
              formattedValue = '$' + (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
            } else if (num >= 1000) {
              formattedValue = '$' + (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
            } else {
              formattedValue = '$' + num.toLocaleString()
            }
            return context.dataset.label + ': ' + formattedValue
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          lineWidth: 1
        },
        border: {
          color: '#e2e8f0'
        },
        ticks: {
          color: '#718096',
          font: {
            family: 'Roboto',
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          lineWidth: 1
        },
        border: {
          color: '#e2e8f0'
        },
        ticks: {
          color: '#718096',
          font: {
            family: 'Roboto',
            size: 12
          },
          callback: function(value: any) {
            const num = Number(value)
            if (num >= 1000000) {
              return '$' + (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
            } else if (num >= 1000) {
              return '$' + (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
            }
            return '$' + num.toLocaleString()
          }
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2
      },
      line: {
        borderWidth: 3
      }
    }
  }

  const formatNumber = (num: number): string => {
    if (isNaN(num) || num === 0) return '0'
    return num.toLocaleString()
  }

  const parseNumber = (str: string): number => {
    const cleaned = str.replace(/,/g, '')
    const num = parseFloat(cleaned)
    return isNaN(num) ? 0 : num
  }

  const handleSimpleInputChange = (field: keyof SimpleInvestmentData, value: string | number) => {
    let processedValue: any = value
    
    if (typeof value === 'string' && field !== 'contributionFrequency') {
      processedValue = parseNumber(value)
    }
    
    setSimpleData(prev => ({
      ...prev,
      [field]: processedValue
    }))
  }

  const handleVariableInputChange = (field: keyof VariableInvestmentData, value: string | number) => {
    let numericValue: number
    
    if (typeof value === 'string') {
      numericValue = parseNumber(value)
    } else {
      numericValue = value
    }
    
    setVariableData(prev => ({
      ...prev,
      [field]: numericValue
    }))
  }

  const handleCheckpointChange = (checkpointId: string, field: keyof InvestmentCheckpoint, value: string | number) => {
    let processedValue: any = value
    
    if (typeof value === 'string' && (field === 'contributionAmount' || field === 'startYear')) {
      processedValue = parseNumber(value)
    }
    
    setVariableData(prev => ({
      ...prev,
      checkpoints: prev.checkpoints.map(cp => 
        cp.id === checkpointId 
          ? { ...cp, [field]: processedValue }
          : cp
      )
    }))
  }

  const addCheckpoint = () => {
    // Sort checkpoints to find the latest one
    const sortedCheckpoints = [...variableData.checkpoints].sort((a, b) => a.startYear - b.startYear)
    const latestCheckpoint = sortedCheckpoints[sortedCheckpoints.length - 1]
    
    // Calculate midpoint between latest checkpoint start and investment period end
    const midPoint = Math.floor((latestCheckpoint.startYear + variableData.years) / 2)
    
    const newCheckpoint: InvestmentCheckpoint = {
      id: Date.now().toString(),
      startYear: midPoint,
      contributionAmount: latestCheckpoint.contributionAmount,
      contributionFrequency: latestCheckpoint.contributionFrequency
    }
    
    setVariableData(prev => ({
      ...prev,
      checkpoints: [...prev.checkpoints, newCheckpoint]
    }))
  }

  const removeCheckpoint = (checkpointId: string) => {
    if (variableData.checkpoints.length <= 1) return // Don't allow removing the last checkpoint
    
    setVariableData(prev => ({
      ...prev,
      checkpoints: prev.checkpoints.filter(cp => cp.id !== checkpointId)
    }))
  }

  const finalValues = chartData ? {
    totalInvested: chartData.datasets[0].data[chartData.datasets[0].data.length - 1],
    totalGrowth: chartData.datasets[1].data[chartData.datasets[1].data.length - 1],
    conventionalGrowth: chartData.datasets[2].data[chartData.datasets[2].data.length - 1]
  } : null

  return (
    <div className="calculator-page">
      <div className="container">
        <div className="calculator-header">
          <h1 className="calculator-title">Investment Calculator</h1>
          <p className="calculator-subtitle">
            Plan your halal investment strategy and see how your money can grow while staying true to Islamic principles
          </p>
          
          {/* Calculator Mode Toggle */}
          <div className="calculator-mode-toggle">
            <div className="toggle-container">
              <button
                type="button"
                className={`toggle-option ${calculatorMode === 'simple' ? 'active' : ''}`}
                onClick={() => setCalculatorMode('simple')}
              >
                <Settings size={18} />
                Simple Calculator
              </button>
              <button
                type="button"
                className={`toggle-option ${calculatorMode === 'variable' ? 'active' : ''}`}
                onClick={() => setCalculatorMode('variable')}
              >
                {calculatorMode === 'variable' ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                Variable Calculator
              </button>
            </div>
            <p className="toggle-description">
              {calculatorMode === 'simple' 
                ? 'Use consistent parameters throughout the investment period' 
                : 'Adjust contributions for different time periods'
              }
            </p>
          </div>
        </div>

        <div className="calculator-content">
          <div className="calculator-layout">
            {/* Left Side - Parameters */}
            <div className="calculator-inputs">
              <h2>Investment Parameters</h2>
              
              {calculatorMode === 'simple' ? (
                /* Simple Calculator Mode */
                <div className="simple-calculator">
                  <div className="input-group">
                    <label>
                      <DollarSign size={20} />
                      Initial Investment
                    </label>
                    <input
                      type="text"
                      value={formatNumber(simpleData.initialAmount)}
                      onChange={(e) => handleSimpleInputChange('initialAmount', e.target.value)}
                      onBlur={(e) => {
                        const formatted = formatNumber(parseNumber(e.target.value))
                        e.target.value = formatted
                      }}
                      placeholder="0"
                    />
                  </div>

                  <div className="input-group">
                    <label>
                      <Calendar size={20} />
                      Contribution Frequency
                    </label>
                    <div className="frequency-toggle">
                      {(['weekly', 'biweekly', 'monthly', 'annually'] as const).map((frequency) => (
                        <button
                          key={frequency}
                          type="button"
                          className={`frequency-btn ${simpleData.contributionFrequency === frequency ? 'active' : ''}`}
                          onClick={() => handleSimpleInputChange('contributionFrequency', frequency)}
                        >
                          {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label>
                      <TrendingUp size={20} />
                      Contribution Amount
                    </label>
                    <input
                      type="text"
                      value={formatNumber(simpleData.contributionAmount)}
                      onChange={(e) => handleSimpleInputChange('contributionAmount', e.target.value)}
                      onBlur={(e) => {
                        const formatted = formatNumber(parseNumber(e.target.value))
                        e.target.value = formatted
                      }}
                      placeholder="0"
                    />
                  </div>

                  <div className="input-group">
                    <label>
                      <Percent size={20} />
                      Annual Return Rate (%)
                    </label>
                    <input
                      type="text"
                      value={simpleData.annualReturn}
                      onChange={(e) => handleSimpleInputChange('annualReturn', e.target.value)}
                      onBlur={(e) => {
                        const num = parseNumber(e.target.value)
                        e.target.value = num.toString()
                      }}
                      placeholder="0"
                    />
                  </div>

                  <div className="input-group">
                    <label>
                      <Calendar size={20} />
                      Investment Period (Years)
                    </label>
                    <input
                      type="text"
                      value={simpleData.years}
                      onChange={(e) => handleSimpleInputChange('years', e.target.value)}
                      onBlur={(e) => {
                        const num = parseNumber(e.target.value)
                        e.target.value = num.toString()
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>
              ) : (
                /* Variable Calculator Mode */
                <div className="variable-calculator">
                  {/* Basic Settings */}
                  <div className="basic-settings">
                    <div className="input-group">
                      <label>
                        <DollarSign size={20} />
                        Initial Investment
                      </label>
                      <input
                        type="text"
                        value={formatNumber(variableData.initialAmount)}
                        onChange={(e) => handleVariableInputChange('initialAmount', e.target.value)}
                        onBlur={(e) => {
                          const formatted = formatNumber(parseNumber(e.target.value))
                          e.target.value = formatted
                        }}
                        placeholder="0"
                      />
                    </div>

                    <div className="input-group">
                      <label>
                        <Percent size={20} />
                        Annual Return Rate (%)
                      </label>
                      <input
                        type="text"
                        value={variableData.annualReturn}
                        onChange={(e) => handleVariableInputChange('annualReturn', e.target.value)}
                        onBlur={(e) => {
                          const num = parseNumber(e.target.value)
                          e.target.value = num.toString()
                        }}
                        placeholder="0"
                      />
                    </div>

                    <div className="input-group">
                      <label>
                        <Calendar size={20} />
                        Investment Period (Years)
                      </label>
                      <input
                        type="text"
                        value={variableData.years}
                        onChange={(e) => handleVariableInputChange('years', e.target.value)}
                        onBlur={(e) => {
                          const num = parseNumber(e.target.value)
                          e.target.value = num.toString()
                        }}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Checkpoints Section */}
                  <div className="checkpoints-section">
                    <div className="checkpoints-header">
                      <h3>Investment Checkpoints</h3>
                      <button
                        type="button"
                        className="add-checkpoint-btn"
                        onClick={addCheckpoint}
                      >
                        <Plus size={16} />
                        Add Checkpoint
                      </button>
                    </div>

                    <div className="checkpoints-list">
                      {variableData.checkpoints
                        .sort((a, b) => a.startYear - b.startYear)
                        .map((checkpoint, index) => (
                        <div key={checkpoint.id} className="checkpoint-card">
                          <div className="checkpoint-header">
                            <h4>Checkpoint {index + 1}: Starting Year {checkpoint.startYear}</h4>
                            {variableData.checkpoints.length > 1 && (
                              <button
                                type="button"
                                className="remove-checkpoint-btn"
                                onClick={() => removeCheckpoint(checkpoint.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>

                          <div className="checkpoint-inputs">
                            <div className="input-group">
                              <label>
                                <Calendar size={16} />
                                Start Year
                              </label>
                              <input
                                type="text"
                                value={checkpoint.startYear}
                                onChange={(e) => handleCheckpointChange(checkpoint.id, 'startYear', e.target.value)}
                                onBlur={(e) => {
                                  const num = parseNumber(e.target.value)
                                  e.target.value = num.toString()
                                }}
                                placeholder="0"
                              />
                            </div>

                            <div className="input-group">
                              <label>
                                <TrendingUp size={16} />
                                Contribution Amount
                              </label>
                              <input
                                type="text"
                                value={formatNumber(checkpoint.contributionAmount)}
                                onChange={(e) => handleCheckpointChange(checkpoint.id, 'contributionAmount', e.target.value)}
                                onBlur={(e) => {
                                  const formatted = formatNumber(parseNumber(e.target.value))
                                  e.target.value = formatted
                                }}
                                placeholder="0"
                              />
                            </div>

                            <div className="input-group">
                              <label>
                                <Calendar size={16} />
                                Frequency
                              </label>
                              <div className="frequency-toggle">
                                {(['weekly', 'biweekly', 'monthly', 'annually'] as const).map((frequency) => (
                                  <button
                                    key={frequency}
                                    type="button"
                                    className={`frequency-btn ${checkpoint.contributionFrequency === frequency ? 'active' : ''}`}
                                    onClick={() => handleCheckpointChange(checkpoint.id, 'contributionFrequency', frequency)}
                                  >
                                    {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Results and Chart */}
            <div className="calculator-output">
              {/* Results Section */}
              {finalValues && (
                <div className="calculator-results">
                  <h2>Investment Summary</h2>
                  <div className="results-grid">
                    <div className="result-card">
                      <h3>Contributions</h3>
                      <p className="result-value">${finalValues.totalInvested.toLocaleString()}</p>
                    </div>
                    <div className="result-card">
                      <h3>Total Growth</h3>
                      <p className="result-value">${finalValues.totalGrowth.toLocaleString()}</p>
                    </div>
                    <div className="result-card highlight">
                      <h3>Investment Total</h3>
                      <p className="result-value">${finalValues.conventionalGrowth.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Chart Section */}
              <div className="calculator-chart">
                <h2>Growth Visualization</h2>
                {chartData && (
                  <div className="chart-container">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Information Section - Full Width */}
          <div className="calculator-info">
            <h2>About Halal Investments</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>What Makes an Investment Halal?</h3>
                <p>Halal investments avoid interest (riba), gambling (maysir), and uncertainty (gharar). They focus on asset-backed, profit-sharing, or ethical business models.</p>
              </div>
              <div className="info-card">
                <h3>Common Halal Investment Options</h3>
                <ul>
                  <li>Sukuk (Islamic bonds)</li>
                  <li>Islamic ETFs and mutual funds</li>
                  <li>Real estate investments</li>
                  <li>Commodity trading</li>
                  <li>Islamic banking products</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="calculator-info">
            <h2>Understanding Your Investment Options</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Halal Investment Principles</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <ul>
                  <li>Avoid interest-based investments (Riba)</li>
                  <li>No speculation or gambling (Gharar)</li>
                  <li>Ethical business practices required</li>
                  <li>Asset-backed investment structures</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h3>Investment Total vs Halal Returns</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <ul>
                  <li>Halal returns typically 15% lower than conventional</li>
                  <li>Focus on sustainable, ethical growth</li>
                  <li>Profit-sharing mechanisms (Mudarabah)</li>
                  <li>Real asset backing provides stability</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h3>Investment Strategies</h3>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <ul>
                  <li>Diversified halal investment portfolios</li>
                  <li>Regular contribution strategies</li>
                  <li>Long-term wealth building approach</li>
                  <li>Risk management techniques</li>
                </ul>
              </div>
            </div>
            
            <div className="detailed-explanation">
              <h3>How This Calculator Works</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel tortor at nulla facilisis tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
              
              <p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              
              <p>Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>
              
              <h4>Key Assumptions</h4>
              <p>Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis.</p>
              
              <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>
              
              <h4>Important Considerations</h4>
              <p>Vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              
              <p>Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentCalculator
