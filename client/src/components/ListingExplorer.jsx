function ListingExplorer({
  filters,
  onFilterChange,
  onSearch,
  listings,
  loading,
  selectedListing,
  onSelectListing,
  onSubscribe,
  subscriptionLoading,
  user,
  message
}) {
  return (
    <section className="panel explorer-panel">
      <div className="section-heading">
        <span className="eyebrow">Search</span>
        <h2>Find PG and mess listings</h2>
        <p>Use the filters below, then click a listing to view its details and plans.</p>
      </div>

      <form className="search-bar" onSubmit={onSearch}>
        <label>
          City
          <input
            name="city"
            value={filters.city}
            onChange={onFilterChange}
            placeholder="Search by city"
          />
        </label>

        <label>
          Type
          <select name="type" value={filters.type} onChange={onFilterChange}>
            <option value="all">All</option>
            <option value="pg">PG</option>
            <option value="mess">Mess</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        <label className="checkbox-label">
          <input
            name="verifiedOnly"
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={onFilterChange}
          />
          Verified only
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {message ? <p className="status status--success">{message}</p> : null}

      <div className="app-grid">
        <div className="listing-results">
          <div className="subsection-heading">
            <h3>Available listings</h3>
            <p>Choose one item to open full details.</p>
          </div>

          {listings.length ? (
            listings.map((listing) => (
              <button
                type="button"
                key={listing._id}
                className={`listing-tile ${
                  selectedListing?._id === listing._id ? "listing-tile--active" : ""
                }`}
                onClick={() => onSelectListing(listing._id)}
              >
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
                <div className="listing-tile__footer">
                  <span>{listing.averageRating || 0} stars</span>
                  <span>{listing.totalReviews || 0} reviews</span>
                </div>
              </button>
            ))
          ) : (
            <div className="empty-state">
              <strong>No listings found.</strong>
              <p>Try another city or remove some filters.</p>
            </div>
          )}
        </div>

        <div className="listing-detail">
          <div className="subsection-heading">
            <h3>Listing details</h3>
            <p>Menu, amenities, rating, and plans appear here.</p>
          </div>

          {selectedListing ? (
            <>
              <div className="detail-header">
                <div>
                  <span className="eyebrow">Selected listing</span>
                  <h3>{selectedListing.name}</h3>
                  <p>
                    {selectedListing.address} | {selectedListing.area}, {selectedListing.city}
                  </p>
                </div>
                <div className="detail-rating">
                  <strong>{selectedListing.averageRating || 0}</strong>
                  <span>Rating</span>
                </div>
              </div>

              <p>{selectedListing.description}</p>

              <div className="chips">
                {selectedListing.amenities?.length ? (
                  selectedListing.amenities.map((item) => (
                    <span className="pill pill--muted" key={item}>
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="pill pill--muted">No amenities added</span>
                )}
              </div>

              <div className="detail-section">
                <h4>Weekly menu</h4>
                <div className="menu-grid">
                  {Object.entries(selectedListing.weeklyMenu || {}).map(([day, meals]) => (
                    <div className="menu-day" key={day}>
                      <strong>{day}</strong>
                      <p>{meals.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>Subscription plans</h4>
                <div className="plan-grid">
                  {selectedListing.mealPlans?.length ? (
                    selectedListing.mealPlans.map((plan) => (
                      <article className="subscription-card" key={plan.type}>
                        <strong>{plan.type}</strong>
                        <p>Price: INR {plan.price}</p>
                        <p>Meals per day: {plan.mealsPerDay}</p>
                        <p>{plan.features?.join(", ") || "No extra features"}</p>
                        <button
                          type="button"
                          onClick={() => onSubscribe(selectedListing._id, plan.type)}
                          disabled={subscriptionLoading || user?.role !== "student"}
                        >
                          {subscriptionLoading ? "Processing..." : `Subscribe ${plan.type}`}
                        </button>
                      </article>
                    ))
                  ) : (
                    <p className="status">No meal plans added yet.</p>
                  )}
                </div>

                {user?.role !== "student" ? (
                  <p className="status">Login as a student account to subscribe to a mess plan.</p>
                ) : null}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <strong>Select a listing to view details.</strong>
              <p>The details panel will update here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ListingExplorer;
