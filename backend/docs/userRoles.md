# User Flows

This document describes how different users interact with IssuePulse.

---

## A. Citizen Flow

1. User registers or logs in
2. Sets location details
3. Reports a civic issue
4. System checks for duplicate issues nearby
5. User either:
   - Attaches report to an existing issue, or
   - Creates a new issue
6. User tracks issue status over time

---

## B. Issue Reporting Flow

1. Issue details are submitted (category, description, location)
2. System performs duplicate detection using:
   - Location proximity
   - Issue category
   - Recent reports
3. If duplicate found:
   - Report is linked to the existing issue
4. If no duplicate:
   - New issue is created with initial status

---

## C. Moderator Flow

1. Moderator views pending issues
2. Verifies authenticity
3. Takes one of the following actions:
   - Approves the issue
   - Merges it with another issue
   - Rejects it if invalid

---

## D. Authority Flow

1. Authority views area-wise dashboards
2. Selects an issue
3. Marks issue as "In Progress"
4. Resolves the issue
5. Closes the issue after confirmation
