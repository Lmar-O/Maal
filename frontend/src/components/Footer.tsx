const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-disclaimer">
            <p>
              <strong>Disclaimer:</strong> Maal is strictly educational and informational. 
              The content provided on this platform is for general knowledge purposes only 
              and does not constitute financial, investment, or professional advice. Always 
              consult with qualified financial advisors before making any investment decisions.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Maal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer