function ProfilePanel({ user, subscriptions, loading, onRefresh, onLogout }) {
  return (
    <section className="panel profile-panel">
      <div className="section-heading">
        <span className="eyebrow">Profile</span>
        <h2>Your account and active subscriptions</h2>
        <p>Use this space to review your role, account details, and the mess plans you joined.</p>
      </div>

      <div className="profile-card">
        <div>
          <strong>{user.name}</strong>
          <p>{user.email}</p>
        </div>
        <div className="chips">
          <span className="pill">{user.role}</span>
          {user.city ? <span className="pill pill--muted">{user.city}</span> : null}
        </div>
      </div>

      <div className="profile-actions">
        <button type="button" onClick={onRefresh} className="button-secondary">
          Refresh profile
        </button>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="detail-section">
        <h4>Subscriptions</h4>
        {loading ? <p className="status">Loading subscriptions...</p> : null}
        {!loading && subscriptions.length ? (
          <div className="plan-grid">
            {subscriptions.map((item) => (
              <article className="subscription-card" key={item._id}>
                <strong>{item.listing?.name || "Listing removed"}</strong>
                <p>{item.listing?.type?.toUpperCase()} subscription</p>
                <p>Plan: {item.planType}</p>
                <p>Status: {item.status}</p>
                <p>Price: INR {item.price}</p>
              </article>
            ))}
          </div>
        ) : null}
        {!loading && !subscriptions.length ? (
          <div className="empty-state">
            <strong>No subscriptions yet.</strong>
            <p>Search for a mess plan and subscribe to see it here.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default ProfilePanel;
