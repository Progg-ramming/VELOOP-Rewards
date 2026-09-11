export function canParticipate(risk) {
  if (risk.action === 'BLOCKED') return { allowed: false, code: 'PARTICIPATION_BLOCKED', message: 'This participation attempt requires review before it can proceed.' };
  if (risk.action === 'FLAGGED') return { allowed: false, code: 'PARTICIPATION_REVIEW', message: 'This participation attempt has been held for review.' };
  return { allowed: true };
}
