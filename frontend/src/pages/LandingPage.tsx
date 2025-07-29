import { Link } from 'react-router-dom'
import { TrendingUp, Shield, BookOpen, ArrowRight } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section with Gradient Background */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Halal Personal Finance<br />Made Simple
              </h1>
              <p className="hero-subtitle">
                Learn. Plan. Grow - the Halal Way
              </p>
              <div className="hero-buttons">
                <Link to="/blog" className="btn-primary">
                  Start Learning
                  <ArrowRight size={20} />
                </Link>
                <Link to="/calculator" className="btn-secondary">
                  Try Calculator
                </Link>
              </div>
            </div>
            
            <div className="hero-graphic">
              <div className="wheat-stalks">
                <img src="/images/wheat.png" alt="Wheat stalks" className="wheat-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="bottom-section">
        <div className="container">
          <div className="content-card">
            <h2>Why Choose Halal Finance?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Shield />
                </div>
                <h3>Interest-Free</h3>
                <p>Learn investment strategies that avoid riba (interest) and comply with Islamic finance principles.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp />
                </div>
                <h3>Grow Your Wealth</h3>
                <p>Discover halal investment opportunities that can help you build sustainable wealth over time.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <BookOpen />
                </div>
                <h3>Educational Resources</h3>
                <p>Access comprehensive guides and articles on Islamic personal finance and investment strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Sections for Testing Scroll */}
      <section className="additional-content">
        <div className="container">
          <div className="content-section">
            <h2>Our Mission</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          </div>

          <div className="content-section">
            <h2>What Makes Us Different</h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
          </div>

          <div className="content-section">
            <h2>Getting Started with Halal Finance</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel tortor at nulla facilisis tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
            <p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta.</p>
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>
          </div>

          <div className="content-section">
            <h2>Investment Principles</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum lorem eu ante bibendum, at tempus nulla facilisis. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula euismod nunc, eu consequat ante lorem ut purus.</p>
            <p>Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur.</p>
          </div>

          <div className="content-section">
            <h2>Building Your Financial Future</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis.</p>
            <p>Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo.</p>
            <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
          </div>

          <div className="content-section">
            <h2>Community and Support</h2>
            <p>Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis.</p>
            <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>
            <p>Vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
