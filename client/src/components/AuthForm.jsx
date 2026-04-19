function AuthForm({
  mode,
  formData,
  onChange,
  onSubmit,
  onModeChange,
  loading,
  error
}) {
  const isRegister = mode === "register";

  return (
    <section className="panel auth-panel">
      <div className="section-heading">
        <span className="eyebrow">{isRegister ? "Create account" : "Welcome back"}</span>
        <h2>{isRegister ? "Register to search and subscribe" : "Login to your account"}</h2>
        <p>
          {isRegister
            ? "Create a student or owner account and start using the platform."
            : "Use your student, owner, or admin account to continue."}
        </p>
      </div>

      <form className="form-grid" onSubmit={onSubmit}>
        {isRegister ? (
          <label>
            Full name
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </label>
        ) : null}

        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Enter password"
            required
          />
        </label>

        {isRegister ? (
          <>
            <label>
              Phone
              <input
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="Optional phone number"
              />
            </label>

            <label>
              City
              <input
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="Pune"
              />
            </label>

            <label>
              Role
              <select name="role" value={formData.role} onChange={onChange}>
                <option value="student">Student</option>
                <option value="owner">Owner</option>
              </select>
            </label>
          </>
        ) : null}

        {error ? <p className="status status--error">{error}</p> : null}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Create account" : "Login"}
        </button>
      </form>

      <p className="auth-switch">
        {isRegister ? "Already have an account?" : "Need a new account?"}{" "}
        <button type="button" className="text-button" onClick={onModeChange}>
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </section>
  );
}

export default AuthForm;
