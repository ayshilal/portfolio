![Illustration of a Databricks cost dashboard, not my real spend](img/00-cost-dashboard.jpg)

When you start learning Databricks on your own Azure subscription, one question comes up quickly: **how much is this costing me, and on what?** The answer is less obvious than it should be. Azure only shows you one line called "Azure Databricks", and the Databricks screen that breaks costs down is hidden behind an admin login that may reject your account.

This post walks through the whole path, including the snags I hit along the way.

![The five stages, from the Azure total to a per-service breakdown](img/01-overview-flow.svg)

---

## Step 1: Get the quick total from Azure

Start with the Azure portal. It needs no extra setup.

1. Search for **Cost Management** in the portal and open **Cost analysis**.
2. Add a filter: **Service name = Azure Databricks**.
3. Set **Group by** to **Meter** and **Granularity** to **Daily**.

This shows your daily Databricks spend, split by type of compute (serverless SQL, jobs, model serving and so on).

**What it can't show you** is *which* endpoint, job or notebook used the money. Azure only sees Databricks Units (DBUs) by meter. For that detail you need Databricks' own billing data, which is what the rest of this guide sets up.

> Tip: cost data lags by about a day. Don't panic if today's activity is missing.

---

## Step 2: Understand why the Databricks admin console may reject you

Databricks has an **account console** at **https://accounts.azuredatabricks.net**. It contains the usage dashboard and the billing settings.

If you created your Azure subscription with a **personal Microsoft account** (for example a Gmail or Outlook address), the console will probably refuse to let you in, even though you are the Owner of the subscription. Two things explain this:

- **Being Owner isn't enough.** "Owner" is an Azure *resource* role. The account console checks a *directory* role, Global Administrator, in **Microsoft Entra ID** (formerly Azure Active Directory).
- **Your personal account is treated as an outsider.** A personal Microsoft account doesn't really live in your directory; Azure stores it as an external identity. The account console wants a native directory user.

![Azure roles versus Entra directory roles](img/02-two-kinds-of-roles.svg)

You can't convert your existing account, but you can create a new native admin user next to it.

---

## Step 3: Create a native admin user in Microsoft Entra ID

Creating a new user doesn't change your existing account, workspace, notebooks or data. It only adds a second identity.

1. In the Azure portal, search for **Microsoft Entra ID** and open it. The **Overview** page shows your primary domain, something like `yourname.onmicrosoft.com`.
2. Go to **Users → + New user → Create new user**.
3. Set the **User principal name**, for example `dbadmin`. The domain is filled in for you.
4. Note the password, or set your own.
5. On the **Assignments** tab, click **+ Add role**, choose **Global Administrator**, then **Review + create**.

This is a powerful account. Give it a strong password and set up multi-factor authentication when asked.

> **Note on verification codes:** the new `…onmicrosoft.com` address has no mailbox, so never choose "send a code by email" for it. Use the password or an authenticator app.

---

## Step 4: Sign in to the account console

1. Open a **private browser window**, so your normal account isn't picked up automatically.
2. Go to **https://accounts.azuredatabricks.net**.
3. Sign in as `dbadmin@yourname.onmicrosoft.com` and change the password when prompted.

Because this user is a Global Administrator, it becomes the first admin of your Databricks account. Check **Workspaces** in the left menu: your workspace should be listed.

---

## Step 5: Add the admin user to your workspace

The usage dashboard is created *inside* a workspace, so the user who sets it up must be a member of that workspace.

**Workspaces → your workspace → Permissions → Add permissions**

Choose `dbadmin` and give it **Admin**. Admin lets it share the dashboard with your normal account later.

---

## Step 6: Import the usage dashboard

**Usage → Setup dashboard**

- Keep **Account usage** selected.
- Choose the latest version.
- Pick your workspace.
- Click **Import**.

If you see *"Unable to register the dashboard. Please confirm that you are a user of the selected workspace"*, step 5 hasn't been done yet.

The dashboard opens in your workspace. At first, every chart may say **"Unable to render visualization"**. That's expected: nobody has permission to read the billing tables yet.

![Every chart says "Unable to render visualization" before access is granted](img/05-unable-to-render.svg)

Click **Show error** on any chart to see the reason. It usually mentions a permission on `system.billing`, which step 7 fixes.

---

## Step 7: Give yourself access to the billing data

Databricks keeps billing data in a special catalog called `system`. Being a workspace admin doesn't grant access to it, so you grant it yourself.

In your workspace:

1. Click **Catalog** in the left sidebar.
2. Under **My organization**, click the word **system** (not the arrow next to it).
3. Open the **Permissions** tab and click **Grant**.
4. Under **Principals**, add your normal account.
5. Tick **USE CATALOG**, **USE SCHEMA** and **SELECT**.
6. Click **Confirm**.

![The Grant dialog with USE CATALOG, USE SCHEMA and SELECT ticked](img/03-grant-on-system.svg)

Granting on the whole `system` catalog covers billing plus the other system tables the dashboard uses.

> **If the Grant button is greyed out:** go back to the account console, open **Catalog**, click your metastore, and set **Metastore admin** to `dbadmin`. Then try again while signed in as `dbadmin`.

> **Security note:** this grant lets the chosen users read all system tables, including audit logs. That's fine on a personal setup. In a company, grant only the schemas each person needs, and avoid granting to "account users".

---

## Step 8: Open the dashboard

1. In the workspace, go to **Dashboards → Account Usage Dashboard**.
2. If charts still fail, open **⋮ → Settings** and make sure a **SQL warehouse** is selected, and check under **SQL Warehouses** that it's running.
3. Click the refresh icon.
4. Optionally click **Share** and give your normal account access, so you don't need `dbadmin` to view it.

You now get spend broken down by product (model serving, vector search, SQL, jobs), by workspace and over time.

---

## Step 9: Look at your AI costs

To see only AI spend, open the **Usage Overview** tab and use the **Billing Origin Product** filter at the top. Select the AI-related products, with names such as `MODEL_SERVING`, `VECTOR_SEARCH` and `AI_GATEWAY`. For cost per endpoint, open the **Top Objects** tab with the same filter.

The filter only lists products that already appear in your billing data, and billing data arrives with a delay of several hours. If you've only made a few test calls, come back the next day.

![Illustrative example of AI costs during a week of labs](img/04-ai-cost-example.svg)

The pattern to expect: endpoints that stay up all day dominate the bill, while the prompts you send cost almost nothing.

---

## Bonus: query the costs yourself

Once you have access, start by asking which products you've used at all:

```sql
SELECT billing_origin_product,
       MIN(usage_date) AS first_seen,
       ROUND(SUM(usage_quantity), 3) AS dbus
FROM system.billing.usage
GROUP BY 1
ORDER BY dbus DESC;
```

Here are my real results after about two months of study labs:

| billing_origin_product | first_seen | dbus |
|---|---|---|
| INTERACTIVE | 2026-08-11 | 35.565 |
| SQL | 2026-08-11 | 16.387 |
| GENIE | 2026-08-10 | 9.699 |
| PREDICTIVE_OPTIMIZATION | 2026-08-11 | 9.244 |
| JOBS | 2026-08-11 | 5.711 |
| DLT | 2026-08-19 | 2.123 |
| NETWORKING | 2026-08-19 | 0.019 |

How to read it:

- **INTERACTIVE** is notebook compute. Running notebooks was my biggest cost.
- **SQL** is SQL warehouses, including the one behind the usage dashboard.
- **GENIE** is natural-language questions over tables.
- **PREDICTIVE_OPTIMIZATION** is automatic background maintenance of managed tables. It runs without you doing anything, which surprises many beginners.
- **JOBS** and **DLT** are scheduled jobs and pipelines.
- **NETWORKING** is data transfer, which is negligible here.

Notice what's **missing**: `MODEL_SERVING` and `VECTOR_SEARCH`. I had already called the hosted Llama and embedding models, but a few test prompts were too small, and too recent, to show up yet. Those rows appear once you create endpoints or use the models more.

The units are DBUs (Databricks Units), not dollars. To turn them into an estimated price, join with the list-price table, as in the next query.

Next, a breakdown by product and endpoint with estimated cost:

```sql
SELECT u.usage_date,
       u.billing_origin_product AS product,
       u.usage_metadata.endpoint_name AS endpoint,
       SUM(u.usage_quantity) AS dbus,
       ROUND(SUM(u.usage_quantity * p.pricing.default), 4) AS est_usd
FROM system.billing.usage u
JOIN system.billing.list_prices p
  ON u.sku_name = p.sku_name
 AND u.usage_start_time >= p.price_start_time
 AND (p.price_end_time IS NULL OR u.usage_end_time <= p.price_end_time)
WHERE u.usage_date >= current_date() - INTERVAL 30 DAYS
GROUP BY ALL
ORDER BY u.usage_date DESC, est_usd DESC;
```

The `est_usd` column uses list prices, so treat it as an estimate. Azure's invoice is the final word.

---

## Lessons learned

- **Pay-per-token model calls are cheap.** A few test prompts cost a fraction of a cent.
- **Always-on resources are what add up.** Vector search endpoints, model serving endpoints and databases bill for every hour they exist, whether you use them or not. Delete them when you stop for the day.
- **The dashboard costs a little too.** It runs on a SQL warehouse, so set the warehouse to auto-stop after a few minutes.
- **A steady daily cost from day one** usually means something left running from an earlier experiment. The dashboard is the quickest way to find it.
- **Keep your normal account for everyday work.** Use the admin user only for account-level tasks.
