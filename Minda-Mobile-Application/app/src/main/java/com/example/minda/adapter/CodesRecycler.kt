package com.example.minda.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.databinding.CodeItemLayoutBinding
import com.example.minda.pojo.admin.AllCodesResponse
import com.example.minda.pojo.admin.Allcode

class CodesAdapter : ListAdapter<Allcode, CodesAdapter.ViewHolder>(ItemDiff()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CodeItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.binding.docCode.text = getItem(position).code
        holder.binding.docEmailOfCode.text = getItem(position).emailDoc
    }

    inner class ViewHolder(val binding: CodeItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<Allcode>() {
        override fun areItemsTheSame(
            oldItem: Allcode, newItem:
            Allcode
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(
            oldItem: Allcode,
            newItem: Allcode
        ): Boolean {
            return oldItem == newItem
        }

    }
}