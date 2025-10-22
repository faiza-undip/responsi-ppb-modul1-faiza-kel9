import { supabase } from "../config/supabaseClient.js";

export const ItemModel = {
  // Get all items with optional status filter
  async getAll(statusFilter = null) {
    let query = supabase
      .from("items")
      .select("*")
      .order("id", { ascending: true });

    // Filter berdasarkan status jika ada
    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Get item by ID
  async getById(id) {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new item
  async create(payload) {
    const { data, error } = await supabase
      .from("items")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update item
  async update(id, payload) {
    const { data, error } = await supabase
      .from("items")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete item
  async remove(id) {
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { message: "Item deleted successfully" };
  }
};