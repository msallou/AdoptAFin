"use server"
import { createClient } from "@/utils/supabase/server";

export async function updateUserEmail(newEmail: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.log('No user is currently signed in.');
      return false;
    }


    // Request email change with redirect
    const { error } = await supabase.auth.updateUser(
      { email: newEmail },
    );

    if (error) {
      console.error('Error requesting email update:', error.message);
      return false;
    }

    console.log('Email verification sent!');
    return true;
  } catch (error) {
    console.error('Exception in updateUserEmail:', error);
    return false;
  }
}

export async function handlePasswordChange(
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  try {
    const supabase = await createClient();
    
    // First verify the current password by attempting a sign-in
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser || !currentUser.email) return false;
    
    // Try signing in with current password to verify it
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: currentUser.email,
      password: currentPassword
    });
    
    if (signInError) {
      console.error('Current password verification failed:', signInError.message);
      return false;
    }
    
    // Current password verified, proceed to update
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      console.error('Error updating password:', error.message);
      return false;
    }
    
    console.log('Password updated successfully!');
    return true;
  } catch (error) {
    console.error('Exception in handlePasswordChange:', error);
    return false;
  }
}