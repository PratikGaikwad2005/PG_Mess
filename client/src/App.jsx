import { useEffect, useState } from "react";
import {
  createListing,
  createSubscription,
  getAdminDashboard,
  getListingDetails,
  getListings,
  getMySubscriptions,
  getProfile,
  loginUser,
  registerUser,
  verifyListing
} from "./api/client";
import AdminPanel from "./components/AdminPanel";
import AuthForm from "./components/AuthForm";
import ListingExplorer from "./components/ListingExplorer";
import ProfilePanel from "./components/ProfilePanel";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  role: "student"
};

const initialAdminForm = {
  name: "",
  type: "mess",
  city: "",
  area: "",
  address: "",
  description: "",
  amenities: "",
  cuisineTags: "",
  weeklyPrice: "",
  weeklyMealsPerDay: "2",
  weeklyFeatures: "",
  monthlyPrice: "",
  monthlyMealsPerDay: "2",
  monthlyFeatures: "",
  weeklyMenu: {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: ""
  }
};

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState(initialForm);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [appMessage, setAppMessage] = useState("");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("messpg-user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("messpg-token") || "");
  const [filters, setFilters] = useState({
    city: "",
    type: "all",
    verifiedOnly: false
  });
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [listingLoading, setListingLoading] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [currentView, setCurrentView] = useState("discover");
  const [adminDashboard, setAdminDashboard] = useState(null);
  const [adminForm, setAdminForm] = useState(initialAdminForm);
  const [adminSubmitting, setAdminSubmitting] = useState(false);
  const [verifyingId, setVerifyingId] = useState("");

  const loadListings = async (activeFilters = filters) => {
    setListingLoading(true);

    try {
      const data = await getListings(activeFilters);
      setListings(data);

      if (data[0]) {
        const detail = await getListingDetails(data[0]._id);
        setSelectedListing(detail.listing);
      } else {
        setSelectedListing(null);
      }
    } catch (error) {
      setAppMessage(error.message);
    } finally {
      setListingLoading(false);
    }
  };

  const loadProfileData = async (activeToken = token) => {
    if (!activeToken) {
      return;
    }

    setProfileLoading(true);

    try {
      const profile = await getProfile(activeToken);
      const [userSubscriptions, dashboard] = await Promise.all([
        profile.role === "student" ? getMySubscriptions(activeToken) : Promise.resolve([]),
        profile.role === "admin" ? getAdminDashboard(activeToken) : Promise.resolve(null)
      ]);

      setUser(profile);
      localStorage.setItem("messpg-user", JSON.stringify(profile));
      setSubscriptions(userSubscriptions);
      setAdminDashboard(dashboard);
    } catch (error) {
      setAppMessage(error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  useEffect(() => {
    if (token) {
      loadProfileData(token);
    }
  }, [token]);

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleFilterChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFilters((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAdminChange = (event) => {
    const { name, value } = event.target;

    if (Object.prototype.hasOwnProperty.call(adminForm.weeklyMenu, name)) {
      setAdminForm((current) => ({
        ...current,
        weeklyMenu: {
          ...current.weeklyMenu,
          [name]: value
        }
      }));
      return;
    }

    setAdminForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    setAppMessage("");

    try {
      const payload =
        authMode === "register"
          ? authForm
          : { email: authForm.email, password: authForm.password };

      const data =
        authMode === "register" ? await registerUser(payload) : await loginUser(payload);

      setUser(data);
      setToken(data.token);
      localStorage.setItem("messpg-token", data.token);
      localStorage.setItem("messpg-user", JSON.stringify(data));
      setAuthForm(initialForm);
      setCurrentView("profile");
      setAppMessage(
        authMode === "register"
          ? "Registration successful. Your account is ready."
          : "Login successful."
      );
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setAppMessage("");
    await loadListings(filters);
    setCurrentView("discover");
  };

  const handleSelectListing = async (listingId) => {
    try {
      const detail = await getListingDetails(listingId);
      setSelectedListing(detail.listing);
    } catch (error) {
      setAppMessage(error.message);
    }
  };

  const handleSubscribe = async (listingId, planType) => {
    if (!token) {
      setCurrentView("auth");
      setAppMessage("Please login as a student to subscribe to a mess plan.");
      return;
    }

    setSubscriptionLoading(true);
    setAppMessage("");

    try {
      await createSubscription(token, { listingId, planType });
      setAppMessage(`Subscribed successfully to the ${planType} plan.`);
      await loadProfileData(token);
      setCurrentView("profile");
    } catch (error) {
      setAppMessage(error.message);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("messpg-token");
    localStorage.removeItem("messpg-user");
    setUser(null);
    setToken("");
    setSubscriptions([]);
    setAdminDashboard(null);
    setCurrentView("discover");
    setAppMessage("You have been logged out.");
  };

  const handleAdminSubmit = async (event) => {
    event.preventDefault();
    setAdminSubmitting(true);
    setAppMessage("");

    const toList = (value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const buildPlan = (type, price, mealsPerDay, features) => {
      if (!price) {
        return null;
      }

      return {
        type,
        price: Number(price),
        mealsPerDay: Number(mealsPerDay || 2),
        features: toList(features)
      };
    };

    const payload = {
      name: adminForm.name,
      type: adminForm.type,
      city: adminForm.city,
      area: adminForm.area,
      address: adminForm.address,
      description: adminForm.description,
      amenities: toList(adminForm.amenities),
      cuisineTags: toList(adminForm.cuisineTags),
      weeklyMenu: Object.fromEntries(
        Object.entries(adminForm.weeklyMenu).map(([day, meals]) => [day, toList(meals)])
      ),
      mealPlans: [
        buildPlan(
          "weekly",
          adminForm.weeklyPrice,
          adminForm.weeklyMealsPerDay,
          adminForm.weeklyFeatures
        ),
        buildPlan(
          "monthly",
          adminForm.monthlyPrice,
          adminForm.monthlyMealsPerDay,
          adminForm.monthlyFeatures
        )
      ].filter(Boolean)
    };

    try {
      await createListing(token, payload);
      setAdminForm(initialAdminForm);
      setAppMessage("New listing created successfully.");
      await Promise.all([loadListings(filters), loadProfileData(token)]);
    } catch (error) {
      setAppMessage(error.message);
    } finally {
      setAdminSubmitting(false);
    }
  };

  const handleVerifyListing = async (listingId) => {
    setVerifyingId(listingId);
    setAppMessage("");

    try {
      await verifyListing(token, listingId);
      setAppMessage("Listing verified successfully.");
      await Promise.all([loadListings(filters), loadProfileData(token)]);
    } catch (error) {
      setAppMessage(error.message);
    } finally {
      setVerifyingId("");
    }
  };

  return (
    <div className="page-shell app-shell">
      <header className="topbar topbar--app">
        <div className="brand">
          <span className="brand__mark">MP</span>
          <div>
            <strong>MessPG</strong>
            <p>Search PG, find mess, and manage subscriptions</p>
          </div>
        </div>

        <div className="topbar__links">
          <button
            type="button"
            className={currentView === "discover" ? "nav-button nav-button--active" : "nav-button"}
            onClick={() => setCurrentView("discover")}
          >
            Discover
          </button>
          <button
            type="button"
            className={currentView === "auth" ? "nav-button nav-button--active" : "nav-button"}
            onClick={() => setCurrentView("auth")}
          >
            {user ? "Switch Account" : "Login"}
          </button>
          <button
            type="button"
            className={currentView === "profile" ? "nav-button nav-button--active" : "nav-button"}
            onClick={() => setCurrentView("profile")}
            disabled={!user}
          >
            {user?.role === "admin" ? "Admin" : "Profile"}
          </button>
        </div>
      </header>

      <section className="hero hero--compact">
        <div className="hero-copy">
          <span className="eyebrow">Simple dashboard</span>
          <h1>Search PG and mess listings, manage your account, and subscribe easily.</h1>
          <p>
            Everything is arranged in clear sections so the main actions are easy to see.
          </p>
        </div>
        <div className="hero-card">
          <p className="hero-card__label">Overview</p>
          <strong>{user ? `Logged in as ${user.name}` : "Guest mode active"}</strong>
          <p>{user ? `${user.role} account` : "Login to access profile and subscriptions"}</p>
          <div className="hero-card__stats">
            <div>
              <span>Listings</span>
              <strong>{listings.length}</strong>
            </div>
            <div>
              <span>Plans</span>
              <strong>{selectedListing?.mealPlans?.length || 0}</strong>
            </div>
            <div>
              <span>My Subs</span>
              <strong>{subscriptions.length}</strong>
            </div>
          </div>
        </div>
      </section>

      {appMessage ? <p className="status status--success">{appMessage}</p> : null}

      <main className="main-stack">
        {currentView === "discover" ? (
          <ListingExplorer
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            listings={listings}
            loading={listingLoading}
            selectedListing={selectedListing}
            onSelectListing={handleSelectListing}
            onSubscribe={handleSubscribe}
            subscriptionLoading={subscriptionLoading}
            user={user}
            message={listingLoading ? "Loading listings..." : ""}
          />
        ) : null}

        {currentView === "auth" ? (
          <AuthForm
            mode={authMode}
            formData={authForm}
            onChange={handleAuthChange}
            onSubmit={handleAuthSubmit}
            onModeChange={() => {
              setAuthError("");
              setAuthMode((current) => (current === "login" ? "register" : "login"));
            }}
            loading={authLoading}
            error={authError}
          />
        ) : null}

        {currentView === "profile" && user?.role !== "admin" ? (
          <ProfilePanel
            user={user}
            subscriptions={subscriptions}
            loading={profileLoading}
            onRefresh={() => loadProfileData(token)}
            onLogout={handleLogout}
          />
        ) : null}

        {currentView === "profile" && user?.role === "admin" ? (
          <AdminPanel
            dashboard={adminDashboard}
            listings={listings}
            formData={adminForm}
            onChange={handleAdminChange}
            onSubmit={handleAdminSubmit}
            onVerify={handleVerifyListing}
            onRefresh={() => loadProfileData(token)}
            submitting={adminSubmitting}
            verifyingId={verifyingId}
            onLogout={handleLogout}
          />
        ) : null}

        {currentView === "profile" && !user ? (
          <section className="panel">
            <div className="empty-state">
              <strong>Please login first.</strong>
              <p>Your profile and subscriptions will appear here after you sign in.</p>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default App;
