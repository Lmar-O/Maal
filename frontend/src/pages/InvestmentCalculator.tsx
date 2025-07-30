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
import { TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react'

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

interface InvestmentData {
  initialAmount: number
  contributionAmount: number
  contributionFrequency: ContributionFrequency
  annualReturn: number
  years: number
}

const InvestmentCalculator = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    initialAmount: 10000,
    contributionAmount: 500,
    contributionFrequency: 'monthly',
    annualReturn: 4,
    years: 20
  })

  const [chartData, setChartData] = useState<any>(null)

  const calculateInvestment = (data: InvestmentData) => {
    const monthlyReturn = data.annualReturn / 100 / 12
    const totalMonths = data.years * 12
    
    // Calculate contribution frequency multipliers
    const getContributionPerMonth = () => {
      switch (data.contributionFrequency) {
        case 'weekly':
          return data.contributionAmount * 4.33 // Average weeks per month
        case 'biweekly':
          return data.contributionAmount * 2.17 // Average biweekly periods per month
        case 'monthly':
          return data.contributionAmount
        case 'annually':
          return data.contributionAmount / 12
        default:
          return data.contributionAmount
      }
    }
    
    const contributionPerMonth = getContributionPerMonth()
    
    const labels: string[] = []
    const totalInvested: number[] = []
    const totalValue: number[] = []
    const totalGrowth: number[] = []
    
    for (let month = 0; month <= totalMonths; month += 12) {
      const year = month / 12
      labels.push(`Year ${year}`)
      
      // Calculate investment total with proper compound interest
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

  useEffect(() => {
    const data = calculateInvestment(investmentData)
    
    setChartData({
      labels: data.labels,
      datasets: [
        {
          label: 'Contributions',
          data: data.totalInvested,
          borderColor: 'rgb(156, 163, 175)',
          backgroundColor: 'rgba(156, 163, 175, 0.1)',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Total Growth',
          data: data.totalGrowth,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Investment Total',
          data: data.totalValue,

          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: false,
          tension: 0.4
        }
      ]
    })
  }, [investmentData])

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Investment Growth Comparison'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString()
          }
        }
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

  const handleInputChange = (field: keyof InvestmentData, value: string | number) => {
    let numericValue: number
    
    if (typeof value === 'string') {
      numericValue = parseNumber(value)
    } else {
      numericValue = value
    }
    
    setInvestmentData(prev => ({
      ...prev,
      [field]: numericValue
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
          <h1 className="calculator-title">Halal Investment Calculator</h1>
          <p className="calculator-subtitle">
            Plan your halal investment strategy and see how your money can grow while staying true to Islamic principles
          </p>
        </div>

        <div className="calculator-content">
          <div className="calculator-layout">
            {/* Left Side - Parameters */}
            <div className="calculator-inputs">
              <h2>Investment Parameters</h2>
              
              <div className="input-group">
                <label>
                  <DollarSign size={20} />
                  Initial Investment
                </label>
                <input
                  type="text"
                  value={formatNumber(investmentData.initialAmount)}
                  onChange={(e) => handleInputChange('initialAmount', e.target.value)}
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
                      className={`frequency-btn ${investmentData.contributionFrequency === frequency ? 'active' : ''}`}
                      onClick={() => setInvestmentData(prev => ({
                        ...prev,
                        contributionFrequency: frequency
                      }))}
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
                  value={formatNumber(investmentData.contributionAmount)}
                  onChange={(e) => handleInputChange('contributionAmount', e.target.value)}
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
                  value={investmentData.annualReturn}
                  onChange={(e) => handleInputChange('annualReturn', e.target.value)}
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
                  value={investmentData.years}
                  onChange={(e) => handleInputChange('years', e.target.value)}
                  onBlur={(e) => {
                    const num = parseNumber(e.target.value)
                    e.target.value = num.toString()
                  }}
                  placeholder="0"
                />
              </div>
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
