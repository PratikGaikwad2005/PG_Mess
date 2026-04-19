const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

function AdminPanel({
  dashboard,
  listings,
  formData,
  onChange,
  onSubmit,
  onVerify,
  onRefresh,
  submitting,
  verifyingId,
  onLogout
}) {
  return (
    <section className="panel profile-panel">
      <div className="section-heading">
        <span className="eyebrow">Admin workspace</span>
        <h2>Add PG and mess listings, verify providers, and review analytics</h2>
        <p>
          Use this dashboard to grow supply on the platform and keep the listing quality high.
        </p>
      </div>

      <div className="profile-actions">
        <button type="button" className="button-secondary" onClick={onRefresh}>
          Refresh analytics
        </button>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Total users</span>
          <strong>{dashboard?.overview?.users ?? 0}</strong>
        </article>
        <article className="stat-card">
          <span>Total listings</span>
          <strong>{dashboard?.overview?.listings ?? 0}</strong>
        </article>
        <article className="stat-card">
          <span>Active subscriptions</span>
          <strong>{dashboard?.overview?.activeSubscriptions ?? 0}</strong>
        </article>
        <article className="stat-card">
          <span>Verified providers</span>
          <strong>{dashboard?.overview?.verifiedListings ?? 0}</strong>
        </article>
      </div>

      <div className="admin-layout">
        <div className="detail-section">
          <div className="subsection-heading">
            <h3>Create listing</h3>
            <p>Add a new PG, mess, or hybrid listing from this form.</p>
          </div>
          <h4>Create new listing</h4>
          <form className="form-grid" onSubmit={onSubmit}>
            <label>
              Listing name
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Sunrise Student Mess"
                required
              />
            </label>

            <label>
              Type
              <select name="type" value={formData.type} onChange={onChange}>
                <option value="mess">Mess</option>
                <option value="pg">PG</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </label>

            <label>
              City
              <input name="city" value={formData.city} onChange={onChange} required />
            </label>

            <label>
              Area
              <input name="area" value={formData.area} onChange={onChange} required />
            </label>

            <label className="form-grid__full">
              Address
              <input name="address" value={formData.address} onChange={onChange} required />
            </label>

            <label className="form-grid__full">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                rows="3"
                placeholder="Describe this PG or mess listing"
                required
              />
            </label>

            <label className="form-grid__full">
              Amenities
              <input
                name="amenities"
                value={formData.amenities}
                onChange={onChange}
                placeholder="WiFi, Laundry, Tiffin Delivery"
              />
            </label>

            <label className="form-grid__full">
              Cuisine tags
              <input
                name="cuisineTags"
                value={formData.cuisineTags}
                onChange={onChange}
                placeholder="veg, non-veg, student-budget"
              />
            </label>

            <div className="form-grid__full detail-section">
              <h4>Weekly menu</h4>
              <div className="menu-grid">
                {days.map((day) => (
                  <label key={day}>
                    {day}
                    <input
                      name={day}
                      value={formData.weeklyMenu[day]}
                      onChange={onChange}
                      placeholder="Comma separated meals"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="form-grid__full plan-grid">
              <article className="subscription-card">
                <h4>Weekly plan</h4>
                <label>
                  Price
                  <input
                    name="weeklyPrice"
                    type="number"
                    min="0"
                    value={formData.weeklyPrice}
                    onChange={onChange}
                  />
                </label>
                <label>
                  Meals per day
                  <input
                    name="weeklyMealsPerDay"
                    type="number"
                    min="1"
                    value={formData.weeklyMealsPerDay}
                    onChange={onChange}
                  />
                </label>
                <label>
                  Features
                  <input
                    name="weeklyFeatures"
                    value={formData.weeklyFeatures}
                    onChange={onChange}
                    placeholder="Lunch, Dinner, Sweet dish"
                  />
                </label>
              </article>

              <article className="subscription-card">
                <h4>Monthly plan</h4>
                <label>
                  Price
                  <input
                    name="monthlyPrice"
                    type="number"
                    min="0"
                    value={formData.monthlyPrice}
                    onChange={onChange}
                  />
                </label>
                <label>
                  Meals per day
                  <input
                    name="monthlyMealsPerDay"
                    type="number"
                    min="1"
                    value={formData.monthlyMealsPerDay}
                    onChange={onChange}
                  />
                </label>
                <label>
                  Features
                  <input
                    name="monthlyFeatures"
                    value={formData.monthlyFeatures}
                    onChange={onChange}
                    placeholder="Priority delivery, Sunday special"
                  />
                </label>
              </article>
            </div>

            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Add listing"}
            </button>
          </form>
        </div>

        <div className="detail-section">
          <div className="subsection-heading">
            <h3>Analysis and moderation</h3>
            <p>Check popular listings and verify pending providers.</p>
          </div>
          <h4>Popular listings</h4>
          <div className="plan-grid">
            {(dashboard?.popularListings || []).map((item) => (
              <article className="subscription-card" key={item._id}>
                <strong>{item.name}</strong>
                <p>{item.city}</p>
                <p>Rating: {item.averageRating}</p>
                <p>Reviews: {item.totalReviews}</p>
              </article>
            ))}
          </div>

          <h4>Listing moderation</h4>
          <div className="listing-results">
            {listings.map((listing) => (
              <article className="listing-tile listing-tile--static" key={listing._id}>
                <div className="listing-tile__top">
                  <span className="pill">{listing.type.toUpperCase()}</span>
                  <span className={listing.isVerified ? "pill pill--success" : "pill pill--muted"}>
                    {listing.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                <strong>{listing.name}</strong>
                <p>
                  {listing.area}, {listing.city}
                </p>
                <p>{listing.description}</p>
                {!listing.isVerified ? (
                  <button
                    type="button"
                    onClick={() => onVerify(listing._id)}
                    disabled={verifyingId === listing._id}
                  >
                    {verifyingId === listing._id ? "Verifying..." : "Verify listing"}
                  </button>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPanel;
