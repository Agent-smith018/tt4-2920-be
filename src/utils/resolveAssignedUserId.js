// Utility to resolve assignedUserId
// Returns the userId if valid, or an error object if invalid
const User = require('../models/User');

async function resolveAssignedUserId(assignedUserId) {
  if (!assignedUserId) return null;
  try {
    const user = await User.findById(assignedUserId);
    if (!user) {
      return { error: 'Invalid assignedUserId' };
    }
    return assignedUserId;
  } catch (err) {
    return { error: 'Invalid assignedUserId' };
  }
}

module.exports = resolveAssignedUserId;
