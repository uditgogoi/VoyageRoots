<script>
	// Form fields
	let title = '';
	let location = '';
	let price = '';
	let duration = '';
	let description = '';
	let isFeatured = false;

	// Categories
	let categories = ['Adventure', 'Luxury', 'Nature', 'Food & Culture'];
	let selectedCategory = '';

	// Modal state
	let showModal = false;
	let newCategoryName = '';

	// Images
	let images = [];

	function addCategory() {
		if (!newCategoryName.trim()) return;

		if (!categories.includes(newCategoryName.trim())) {
			categories = [...categories, newCategoryName.trim()];
		}

		selectedCategory = newCategoryName.trim();
		newCategoryName = '';
		showModal = false;
	}

	function handleImageUpload(event) {
		const files = Array.from(event.target.files);

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				images = [...images, e.target.result];
			};
			reader.readAsDataURL(file);
		});
	}

	function removeImage(index) {
		images = images.filter((_, i) => i !== index);
	}
</script>

<div class="max-w-5xl mx-auto py-10 px-6">

	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-3xl font-bold">Create New Experience</h1>
			<p class="text-sm text-base-content/60 mt-1">
				Add and manage curated travel experiences.
			</p>
		</div>

		<span class="badge bg-secondary/10 text-secondary border border-secondary/20">
			Draft
		</span>
	</div>

	<!-- Main Card -->
	<div class="card bg-white shadow-xl border border-base-300">
		<div class="card-body space-y-10">

			<!-- Basic Info -->
			<div>
				<h2 class="text-lg font-semibold mb-6">Basic Information</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

					<input type="text" bind:value={title}
						placeholder="Experience Title"
						class="input input-bordered focus:input-primary bg-base-100" />

					<input type="text" bind:value={location}
						placeholder="Location"
						class="input input-bordered focus:input-primary bg-base-100" />

					<input type="number" bind:value={price}
						placeholder="Price"
						class="input input-bordered focus:input-primary bg-base-100" />

					<select bind:value={duration}
						class="select select-bordered focus:select-primary bg-base-100">
						<option disabled selected>Select duration</option>
						<option>2 Hours</option>
						<option>Half Day</option>
						<option>Full Day</option>
						<option>Multi Day</option>
					</select>

				</div>
			</div>

			<!-- Images Section -->
			<div>
				<h2 class="text-lg font-semibold mb-6">Images</h2>

				<div class="border-2 border-dashed border-base-300 rounded-xl p-6 text-center bg-base-100 hover:border-primary transition">

					<input
						type="file"
						accept="image/*"
						multiple
						class="hidden"
						id="imageUpload"
						on:change={handleImageUpload}
					/>

					<label for="imageUpload" class="cursor-pointer">

						<div class="flex flex-col items-center gap-2">
							<div class="text-primary text-4xl">+</div>
							<p class="font-medium">Click to upload images</p>
							<p class="text-xs text-base-content/50">
								PNG, JPG up to 5MB
							</p>
						</div>

					</label>
				</div>

				<!-- Preview Grid -->
				{#if images.length > 0}
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
						{#each images as img, index}
							<div class="relative group">
								<img
									src={img}
									alt="Preview"
									class="rounded-xl object-cover h-32 w-full shadow-md"
								/>

								<button
									class="absolute top-2 right-2 btn btn-xs btn-error opacity-0 group-hover:opacity-100 transition"
									on:click={() => removeImage(index)}
								>
									✕
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Category Section -->
			<div>
				<h2 class="text-lg font-semibold mb-6">Category & Feature</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

					<div class="dropdown w-full">
						<label tabindex="0"
							class="input input-bordered flex items-center justify-between bg-base-100 cursor-pointer">
							<span class={selectedCategory ? '' : 'text-base-content/40'}>
								{selectedCategory || 'Select category'}
							</span>
							<span>▼</span>
						</label>

						<ul tabindex="0"
							class="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-full mt-2 border border-base-300">

							{#each categories as cat}
								<li>
									<a on:click={() => (selectedCategory = cat)}>
										{cat}
									</a>
								</li>
							{/each}

							<div class="divider my-1"></div>

							<li>
								<a class="text-primary font-medium"
									on:click={() => (showModal = true)}>
									+ Add New Category
								</a>
							</li>

						</ul>
					</div>

					<label class="cursor-pointer label gap-3">
						<input type="checkbox"
							bind:checked={isFeatured}
							class="toggle toggle-primary" />
						<span class="label-text font-medium">
							Mark as Featured
						</span>
					</label>

				</div>
			</div>

			<!-- Description -->
			<div>
				<h2 class="text-lg font-semibold mb-4">Description</h2>

				<textarea
					bind:value={description}
					class="textarea textarea-bordered focus:textarea-primary bg-base-100 w-full min-h-[140px]"
					placeholder="Describe the experience..."
				></textarea>
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-4 pt-6 border-t border-base-300">

				<button class="btn btn-ghost">
					Cancel
				</button>

				<button class="btn btn-secondary">
					Save Draft
				</button>

				<button class="btn btn-primary shadow-lg">
					Publish Experience
				</button>

			</div>

		</div>
	</div>

	<!-- Modal -->
	{#if showModal}
		<div class="modal modal-open">
			<div class="modal-box bg-white">

				<h3 class="font-bold text-lg mb-4">
					Add New Category
				</h3>

				<input
					type="text"
					bind:value={newCategoryName}
					placeholder="Category name"
					class="input input-bordered w-full focus:input-primary bg-base-100"
				/>

				<div class="modal-action">
					<button class="btn btn-ghost"
						on:click={() => (showModal = false)}>
						Cancel
					</button>

					<button class="btn btn-primary"
						on:click={addCategory}>
						Add Category
					</button>
				</div>

			</div>

			<div class="modal-backdrop"
				on:click={() => (showModal = false)}></div>
		</div>
	{/if}

</div>