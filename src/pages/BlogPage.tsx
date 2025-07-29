import { useState } from 'react'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding Riba: Why Interest is Forbidden in Islam",
      excerpt: "Learn about the Islamic prohibition of riba (interest) and how it affects modern financial decisions. Discover alternative approaches to borrowing and lending.",
      category: "Islamic Finance",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Halal Investment Strategies: Building Wealth Ethically",
      excerpt: "Explore various halal investment options including sukuk, Islamic ETFs, and ethical stocks. Learn how to build a diversified portfolio that aligns with Islamic principles.",
      category: "Investment",
      date: "2024-01-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Saving for Hajj: A Complete Financial Guide",
      excerpt: "Plan your spiritual journey with our comprehensive guide to saving for Hajj. Learn budgeting strategies and investment options to make your dream a reality.",
      category: "Saving",
      date: "2024-01-05",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Zakat Calculation: Your Complete Guide",
      excerpt: "Understand your zakat obligations and learn how to calculate and distribute your charitable giving effectively. Includes modern examples and calculators.",
      category: "Islamic Finance",
      date: "2024-01-01",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Emergency Fund: Islamic Approach to Financial Security",
      excerpt: "Build financial security the halal way. Learn how to create an emergency fund that provides peace of mind while staying true to Islamic principles.",
      category: "Saving",
      date: "2023-12-28",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1554224154-26032cdc-5d27?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Islamic Banking vs Conventional Banking: Key Differences",
      excerpt: "Compare Islamic banking principles with conventional banking. Understand the fundamental differences and choose the right financial services for your needs.",
      category: "Islamic Finance",
      date: "2023-12-25",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop"
    }
  ]

  const categories = ['all', 'Islamic Finance', 'Investment', 'Saving']

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="blog-page">
      <div className="container">
        {/* Header */}
        <div className="blog-header">
          <h1 className="blog-title">Islamic Finance Blog</h1>
          <p className="blog-subtitle">
            Learn about halal personal finance, investment strategies, and Islamic financial principles
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <div className="blog-category">{post.category}</div>
              </div>
              
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">
                    <Calendar size={16} />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="blog-read-time">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                
                <button className="read-more-btn">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Additional Content Sections for Testing Scroll */}
        <div className="blog-additional-content">
          <section className="content-section">
            <h2>Understanding Halal Investment Principles</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
          </section>

          <section className="content-section">
            <h2>Islamic Finance in Modern Markets</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel tortor at nulla facilisis tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
            <p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta.</p>
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>
          </section>

          <section className="content-section">
            <h2>Building Wealth the Halal Way</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum lorem eu ante bibendum, at tempus nulla facilisis. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula euismod nunc, eu consequat ante lorem ut purus.</p>
            <p>Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur.</p>
          </section>

          <section className="content-section">
            <h2>Risk Management in Islamic Investing</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis.</p>
            <p>Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo.</p>
            <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
